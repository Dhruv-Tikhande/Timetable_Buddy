import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    default: ''
  },
  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: [true, 'Course is required']
  },
  facultyId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Faculty is required']
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline is required']
  },
  status: {
    type: String,
    enum: ['Pending', 'Overdue'],
    default: 'Pending'
  },
  submittedBy: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Indexes for efficient queries
assignmentSchema.index({ courseId: 1, deadline: 1 });
assignmentSchema.index({ facultyId: 1, createdAt: -1 });

export default mongoose.model('Assignment', assignmentSchema);


