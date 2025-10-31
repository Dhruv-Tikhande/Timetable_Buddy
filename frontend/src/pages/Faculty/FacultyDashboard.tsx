import { useState, useEffect } from 'react';
import { facultyAPI } from '../../utils/api';
import { Plus, CreditCard as Edit, Trash2, Users, Clock, MapPin, Calendar, BookOpen, AlertCircle, CheckCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface LectureSlot {
  _id: string;
  subjectName: string;
  venue: string;
  capacity: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  description?: string;
  recurring: boolean;
  enrollments: {
    enrolled: any[];
    waitlisted: any[];
    totalEnrolled: number;
    totalWaitlisted: number;
  };
}

interface SlotFormData {
  subjectName: string;
  venue: string;
  capacity: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  description: string;
  isRecurring: boolean;
}

// NOTE: Hoisting the modal component to top-level keeps its component type stable across
// renders. Defining it inline inside the parent caused React to treat it as a new type
// every render, unmounting/remounting inputs and thus losing focus on each keystroke.
const SlotModal = ({
  editingSlot,
  days,
  formData,
  formErrors,
  handleInputChange,
  handleSubmit,
  handleCloseModal,
}: {
  editingSlot: LectureSlot | null;
  days: string[];
  formData: SlotFormData;
  formErrors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCloseModal: () => void;
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">
            {editingSlot ? 'Edit Lecture Slot' : 'Create New Lecture Slot'}
          </h3>
          <button
            onClick={handleCloseModal}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Name *
            </label>
            <input
              type="text"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                formErrors.subjectName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., Data Structures"
            />
            {formErrors.subjectName && (
              <p className="mt-1 text-sm text-red-600">{formErrors.subjectName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue *
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                formErrors.venue ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., Room 101"
            />
            {formErrors.venue && (
              <p className="mt-1 text-sm text-red-600">{formErrors.venue}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacity *
            </label>
            <input
              type="number"
              name="capacity"
              min="1"
              max="500"
              value={formData.capacity}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                formErrors.capacity ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {formErrors.capacity && (
              <p className="mt-1 text-sm text-red-600">{formErrors.capacity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Day of Week *
            </label>
            <select
              name="dayOfWeek"
              value={formData.dayOfWeek}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              {days.map((day, index) => (
                <option key={index} value={index}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time *
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                formErrors.startTime ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {formErrors.startTime && (
              <p className="mt-1 text-sm text-red-600">{formErrors.startTime}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time *
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
                formErrors.endTime ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {formErrors.endTime && (
              <p className="mt-1 text-sm text-red-600">{formErrors.endTime}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Optional description for the lecture slot"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isRecurring"
            checked={formData.isRecurring}
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Recurring weekly
          </label>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCloseModal}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            {editingSlot ? 'Update Slot' : 'Create Slot'}
          </button>
        </div>
      </form>
    </div>
  </div>
);

const FacultyDashboard = () => {
  const [lectureSlots, setLectureSlots] = useState<LectureSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<LectureSlot | null>(null);
  const [formData, setFormData] = useState<SlotFormData>({
    subjectName: '',
    venue: '',
    capacity: 30,
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '10:00',
    description: '',
    isRecurring: true,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    fetchLectureSlots();
  }, []);

  const fetchLectureSlots = async () => {
    try {
      const response = await facultyAPI.getLectureSlots();
      setLectureSlots(response.data.data);
    } catch (error: any) {
      toast.error('Failed to fetch lecture slots');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.subjectName.trim()) {
      errors.subjectName = 'Subject name is required';
    }

    if (!formData.venue.trim()) {
      errors.venue = 'Venue is required';
    }

    if (formData.capacity < 1 || formData.capacity > 500) {
      errors.capacity = 'Capacity must be between 1 and 500';
    }

    // Validate time format and logic
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(formData.startTime)) {
      errors.startTime = 'Invalid start time format (HH:MM)';
    }
    if (!timeRegex.test(formData.endTime)) {
      errors.endTime = 'Invalid end time format (HH:MM)';
    }

    // Check if start time is before end time
    if (formData.startTime && formData.endTime) {
      const [startHour, startMin] = formData.startTime.split(':').map(Number);
      const [endHour, endMin] = formData.endTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;

      if (startMinutes >= endMinutes) {
        errors.endTime = 'End time must be after start time';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (editingSlot) {
        await facultyAPI.updateLectureSlot(editingSlot._id, formData);
        toast.success('Lecture slot updated successfully');
      } else {
        await facultyAPI.createLectureSlot(formData);
        toast.success('Lecture slot created successfully');
      }
      
      fetchLectureSlots();
      handleCloseModal();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (slot: LectureSlot) => {
    setEditingSlot(slot);
    setFormData({
      subjectName: slot.subjectName,
      venue: slot.venue,
      capacity: slot.capacity,
      dayOfWeek: slot.dayOfWeek,
      startTime: slot.startTime,
      endTime: slot.endTime,
      description: slot.description || '',
      isRecurring: slot.recurring,
    });
    setShowModal(true);
  };

  const handleDelete = async (slot: LectureSlot) => {
    if (!confirm(`Are you sure you want to delete "${slot.subjectName}"?`)) return;

    try {
      await facultyAPI.deleteLectureSlot(slot._id);
      toast.success('Lecture slot deleted successfully');
      fetchLectureSlots();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete lecture slot');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSlot(null);
    setFormData({
      subjectName: '',
      venue: '',
      capacity: 30,
      dayOfWeek: 1,
      startTime: '09:00',
      endTime: '10:00',
      description: '',
      isRecurring: true,
    });
    setFormErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // (removed inline SlotModal to prevent remounting)

  const SlotCard = ({ slot }: { slot: LectureSlot }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {slot.subjectName}
          </h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{days[slot.dayOfWeek]}</span>
            <Clock className="h-4 w-4 ml-3 mr-1" />
            <span>{slot.startTime} - {slot.endTime}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{slot.venue}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(slot)}
            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(slot)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {slot.description && (
        <p className="text-sm text-gray-600 mb-4">{slot.description}</p>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <Users className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">
            {slot.enrollments.totalEnrolled}/{slot.capacity} enrolled
          </span>
        </div>
        
        {slot.enrollments.totalWaitlisted > 0 && (
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
            <span className="text-sm text-gray-600">
              {slot.enrollments.totalWaitlisted} waitlisted
            </span>
          </div>
        )}
      </div>

      {/* Enrollment Status */}
      <div className="space-y-3">
        {slot.enrollments.enrolled.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              Enrolled Students ({slot.enrollments.totalEnrolled})
            </h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {slot.enrollments.enrolled.slice(0, 5).map((enrollment: any) => (
                <div key={enrollment._id} className="flex justify-between items-center text-xs bg-green-50 p-2 rounded">
                  <span className="font-medium">{enrollment.studentId.name}</span>
                  <span className="text-gray-500">{enrollment.studentId.meta?.studentId}</span>
                </div>
              ))}
              {slot.enrollments.enrolled.length > 5 && (
                <p className="text-xs text-gray-500 text-center">
                  +{slot.enrollments.enrolled.length - 5} more students
                </p>
              )}
            </div>
          </div>
        )}

        {slot.enrollments.waitlisted.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
              Waitlisted Students ({slot.enrollments.totalWaitlisted})
            </h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {slot.enrollments.waitlisted.slice(0, 5).map((enrollment: any) => (
                <div key={enrollment._id} className="flex justify-between items-center text-xs bg-yellow-50 p-2 rounded">
                  <span className="font-medium">{enrollment.studentId.name}</span>
                  <span className="text-gray-500">Position {enrollment.position}</span>
                </div>
              ))}
              {slot.enrollments.waitlisted.length > 5 && (
                <p className="text-xs text-gray-500 text-center">
                  +{slot.enrollments.waitlisted.length - 5} more students
                </p>
              )}
            </div>
          </div>
        )}

        {slot.enrollments.totalEnrolled === 0 && slot.enrollments.totalWaitlisted === 0 && (
          <div className="text-center py-4 text-gray-500">
            <Users className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No students enrolled yet</p>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Manage your lecture slots and view student enrollments.
            </p>
          </div>
          
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Lecture Slot
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Slots</p>
                <p className="text-2xl font-bold text-gray-900">{lectureSlots.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Enrolled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {lectureSlots.reduce((sum, slot) => sum + slot.enrollments.totalEnrolled, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Waitlisted</p>
                <p className="text-2xl font-bold text-gray-900">
                  {lectureSlots.reduce((sum, slot) => sum + slot.enrollments.totalWaitlisted, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {lectureSlots.filter(slot => slot.recurring).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lecture Slots */}
        {lectureSlots.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {lectureSlots.map((slot) => (
              <SlotCard key={slot._id} slot={slot} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No lecture slots yet</h3>
            <p className="mt-1 text-gray-500 mb-6">
              Get started by creating your first lecture slot.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Slot
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <SlotModal
            editingSlot={editingSlot}
            days={days}
            formData={formData}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;