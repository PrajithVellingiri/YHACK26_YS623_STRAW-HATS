import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { getAdminCompliances, createAdminCompliance, updateAdminCompliance, deleteAdminCompliance } from '../services/api';
import { ArrowLeft, Plus, Edit2, Trash2, X } from 'lucide-react';

export const ComplianceManagementPage: React.FC = () => {
  const [rules, setRules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<any | null>(null);
  
  const [formData, setFormData] = useState({
    name: '', sector: 'All', state: 'All', business_size: 'All', 
    department: '', requirement_type: 'Required', description: '', required_documents: ''
  });

  const fetchRules = async () => {
    try {
      const data = await getAdminCompliances();
      setRules(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleOpenModal = (rule?: any) => {
    if (rule) {
      setEditingRule(rule);
      setFormData({
        name: rule.name, sector: rule.sector, state: rule.state, business_size: rule.business_size,
        department: rule.department, requirement_type: rule.requirement_type, description: rule.description,
        required_documents: rule.required_documents || ''
      });
    } else {
      setEditingRule(null);
      setFormData({
        name: '', sector: 'All', state: 'All', business_size: 'All', 
        department: '', requirement_type: 'Required', description: '', required_documents: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRule) {
        await updateAdminCompliance(editingRule.id, formData);
      } else {
        await createAdminCompliance(formData);
      }
      setIsModalOpen(false);
      fetchRules();
    } catch (e) {
      console.error("Failed to save rule:", e);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this rule?")) {
      try {
        await deleteAdminCompliance(id);
        fetchRules();
      } catch (e) {
        console.error("Failed to delete rule:", e);
      }
    }
  };

  const getDocCount = (docString: string) => docString ? docString.split(',').length : 0;

  if (isLoading) {
    return <div className="text-center py-12">Loading compliance data...</div>;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <Link to="/admin" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to System Overview
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Compliance Rules</h1>
            <p className="text-gray-600">Manage the master dataset used by the Rules Engine.</p>
          </div>
          <Button className="gap-2" onClick={() => handleOpenModal()}><Plus className="w-4 h-4" /> Add Rule</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium">ID</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Required Docs</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{rule.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{rule.name}</td>
                    <td className="px-6 py-4">{rule.department}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                        {getDocCount(rule.required_documents)} docs
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => handleOpenModal(rule)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(rule.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {rules.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No compliance rules configured.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold">{editingRule ? 'Edit Rule' : 'Add Rule'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input label="Rule Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              <Input label="Department" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Sector" value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})} required />
                <Input label="State" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Business Size" value={formData.business_size} onChange={e => setFormData({...formData, business_size: e.target.value})} required />
                <Input label="Requirement Type" value={formData.requirement_type} onChange={e => setFormData({...formData, requirement_type: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full px-3 py-2 border rounded-xl" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required></textarea>
              </div>
              <Input label="Required Documents (comma-separated)" value={formData.required_documents} onChange={e => setFormData({...formData, required_documents: e.target.value})} />
              
              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={handleCloseModal}>Cancel</Button>
                <Button type="submit">{editingRule ? 'Save Changes' : 'Create Rule'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};