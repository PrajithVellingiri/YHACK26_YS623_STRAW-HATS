import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { getAdminCompliances, createAdminCompliance, updateAdminCompliance, deleteAdminCompliance } from '../services/api';
import { Plus, Edit2, Trash2, ArrowLeft, X, Database } from 'lucide-react';

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
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center animate-pulse shadow-inner">
          <Database className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-gov-navy tracking-tight">Loading compliance rules...</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <Link to="/admin" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-gov-teal mb-6 uppercase tracking-wider transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to System Overview
        </Link>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-soft border border-slate-200">
          <div>
            <h1 className="text-3xl font-extrabold text-gov-navy tracking-tight mb-1">Compliance Rules</h1>
            <p className="text-slate-500 font-medium">Manage the master dataset used by the Rules Engine.</p>
          </div>
          <Button variant="primary" className="gap-2 shadow-premium bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleOpenModal()}><Plus className="w-4 h-4" /> Add Rule</Button>
        </div>
      </div>

      <Card className="border-t-4 border-t-amber-500 shadow-soft">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-5">ID</th>
                  <th className="px-6 py-5">Name</th>
                  <th className="px-6 py-5">Department</th>
                  <th className="px-6 py-5">Required Docs</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-400">{rule.id}</td>
                    <td className="px-6 py-4 font-extrabold text-gov-navy">{rule.name}</td>
                    <td className="px-6 py-4 font-medium text-slate-600">{rule.department}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                        {getDocCount(rule.required_documents)} docs
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-gov-blue hover:text-blue-700 hover:bg-blue-50" onClick={() => handleOpenModal(rule)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(rule.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {rules.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                      No compliance rules configured in the system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-premium w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xl font-extrabold text-gov-navy tracking-tight">{editingRule ? 'Edit Rule' : 'Add Rule'}</h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
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
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                <textarea className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all resize-none shadow-sm font-medium text-slate-700" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required></textarea>
              </div>
              <Input label="Required Documents (comma-separated)" value={formData.required_documents} onChange={e => setFormData({...formData, required_documents: e.target.value})} />
              
              <div className="pt-6 flex justify-end gap-3 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={handleCloseModal} className="font-bold">Cancel</Button>
                <Button type="submit" variant="primary" className="bg-amber-600 hover:bg-amber-700 text-white shadow-md font-bold">{editingRule ? 'Save Changes' : 'Create Rule'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};