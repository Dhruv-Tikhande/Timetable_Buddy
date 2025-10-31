import Assignment from '../models/Assignment.js';
import Course from '../models/Course.js';

// Helper to compute status dynamically
const computeStatus = (assignment, submissionsByStudentId, currentUserId) => {
  const now = new Date();
  const isOverdue = now > new Date(assignment.deadline);
  const submittedSet = submissionsByStudentId || new Set(
    (assignment.submittedBy || []).map((id) => String(id))
  );
  const isSubmitted = currentUserId && submittedSet.has(String(currentUserId));
  if (isSubmitted) return 'Submitted';
  if (isOverdue) return 'Overdue';
  return 'Pending';
};

// @desc    Faculty: create assignment
// @route   POST /api/assignments
// @access  Private (Faculty)
export const createAssignment = async (req, res, next) => {
  try {
    const facultyId = req.user.id;
    const { title, description, courseId, deadline } = req.body;

    if (!title || !courseId || !deadline) {
      return res.status(400).json({ success: false, message: 'title, courseId, deadline are required' });
    }

    // Ensure faculty owns/teaches this course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    if (course.instructor && String(course.instructor) !== String(facultyId) && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized for this course' });
    }

    const assignment = await Assignment.create({
      title,
      description,
      courseId,
      facultyId,
      deadline
    });

    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    next(error);
  }
};

// @desc    List assignments
// @route   GET /api/assignments
// @access  Private (Students: enrolled courses; Faculty: own courses; Admin: all)
export const listAssignments = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let filter = {};
    if (role === 'faculty') {
      filter = { facultyId: userId };
    } else if (role === 'student') {
      // Find courses where student is enrolled
      const courses = await Course.find({ enrolledStudents: userId }, { _id: 1 });
      const courseIds = courses.map(c => c._id);
      filter = { courseId: { $in: courseIds } };
    }

    const assignments = await Assignment.find(filter)
      .populate('courseId', 'courseCode title')
      .populate('facultyId', 'name email')
      .sort({ deadline: 1 });

    // Compute dynamic status for students (Submitted/Overdue/Pending)
    // For this MVP, we use a lightweight submissions store on the assignment model by student ids via a Map-like pattern.
    // Since the spec requires only mark as Submitted, we can store per-user submission in a separate collection or embedded map.
    // To keep minimal, we will accept an optional in-memory overlay from a separate Submission model if present; otherwise fallback to Pending/Overdue.

    // If a separate submission model exists, plug here. Skipping for now.

    const response = assignments.map(a => ({
      ...a.toObject(),
      computedStatus: computeStatus(a, undefined, role === 'student' ? userId : undefined)
    }));

    res.status(200).json({ success: true, count: response.length, data: response });
  } catch (error) {
    next(error);
  }
};

// @desc    Student: mark assignment as submitted
// @route   POST /api/assignments/:id/submit
// @access  Private (Student)
export const submitAssignment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const assignmentId = req.params.id;

    const assignment = await Assignment.findById(assignmentId).populate('courseId', 'enrolledStudents');
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    // Ensure student belongs to the course
    const course = assignment.courseId;
    const isEnrolled = course && course.enrolledStudents?.some(s => String(s) === String(userId));
    if (!isEnrolled) {
      return res.status(403).json({ success: false, message: 'Not enrolled in this course' });
    }

    // Minimal implementation: create or update a Submission document
    // To keep scope small, store submitted student ids array on assignment (not ideal for large scale but ok here)
    if (!assignment.submittedBy) {
      assignment.submittedBy = [];
    }
    if (!assignment.submittedBy.map(String).includes(String(userId))) {
      assignment.submittedBy.push(userId);
      await assignment.save();
    }

    res.status(200).json({ success: true, message: 'Marked as submitted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Faculty/Admin: delete assignment
// @route   DELETE /api/assignments/:id
// @access  Private (Faculty owning course or Admin)
export const deleteAssignment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    if (role !== 'admin' && String(assignment.facultyId) !== String(userId)) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await assignment.deleteOne();
    res.status(200).json({ success: true, message: 'Assignment deleted' });
  } catch (error) {
    next(error);
  }
};


