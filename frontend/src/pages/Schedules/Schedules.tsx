import { useState, useEffect } from 'react';
import { assignmentsAPI, coursesAPI } from '../../utils/api';
import { Plus, Calendar, Clock, Trash2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Schedules = () => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [aRes, cRes] = await Promise.all([
        assignmentsAPI.list(),
        coursesAPI.getCourses()
      ]);
      setAssignments(aRes.data.data || []);
      setCourses(cRes.data.data || []);
    } catch (error) {
      toast.error('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (data: any) => {
    try {
      await assignmentsAPI.create(data);
      toast.success('Assignment created');
      await fetchAll();
      setShowCreateModal(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create assignment');
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    if (!confirm('Delete this assignment?')) return;
    try {
      await assignmentsAPI.remove(id);
      toast.success('Assignment deleted');
      await fetchAll();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete assignment');
    }
  };

  const handleSubmitAssignment = async (id: string) => {
    try {
      await assignmentsAPI.submit(id);
      toast.success('Marked as submitted');
      await fetchAll();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit');
    }
  };

  const CreateAssignmentModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      courseId: '',
      deadline: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleCreateAssignment(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Assignment</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Project Milestone 1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select
                  required
                  value={formData.courseId}
                  onChange={(e) => setFormData(prev => ({ ...prev, courseId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a course</option>
                  {courses.map((c: any) => (
                    <option key={c._id} value={c._id}>{c.courseCode} - {c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="datetime-local"
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Instructions, resources, submission format..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button type="submit" className="flex-1 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200">Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const AssignmentCard = ({ item }: { item: any }) => {
    const deadline = new Date(item.deadline);
    const isOverdue = new Date() > deadline && item.computedStatus !== 'Submitted';
    const status = item.computedStatus || (isOverdue ? 'Overdue' : 'Pending');
    const badgeClass = status === 'Submitted' ? 'bg-green-100 text-green-800'
      : status === 'Overdue' ? 'bg-red-100 text-red-800'
      : 'bg-yellow-100 text-yellow-800';

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <p className="text-gray-600">{item.courseId?.courseCode} - {item.courseId?.title}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}>{status}</span>
        </div>

        {item.description && (
          <p className="text-sm text-gray-700 mb-4 whitespace-pre-wrap">{item.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>{deadline.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            {status !== 'Submitted' && (
              <button onClick={() => handleSubmitAssignment(item._id)} className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                <CheckCircle2 className="h-4 w-4 mr-1" /> Submit
              </button>
            )}
            <button onClick={() => handleDeleteAssignment(item._id)} className="p-2 text-gray-400 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assignments / To-Do</h1>
            <p className="text-gray-600 mt-2">Track and submit your course assignments.</p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Assignment
          </button>
        </div>

        {assignments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((a) => (
              <AssignmentCard key={a._id} item={a} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No assignments yet</h3>
            <p className="mt-1 text-gray-500 mb-6">Create your first assignment.</p>
            <button onClick={() => setShowCreateModal(true)} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
              <Plus className="h-4 w-4 mr-2" /> New Assignment
            </button>
          </div>
        )}

        {showCreateModal && <CreateAssignmentModal />}
      </div>
    </div>
  );
};

export default Schedules;