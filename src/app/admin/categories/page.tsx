"use client"
import { useEffect, useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({ _id: "", name: "", slug: "", description: "" })
  useEffect(() => {
    fetchCategories()
  }, [])
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories")
      const data = await res.json()
      if (Array.isArray(data)) {
        setCategories(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return
    try {
      const token = localStorage.getItem("adminToken")
      await fetch(`/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      setCategories(categories.filter(c => c._id !== id))
    } catch (error) {
      console.error(error)
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("adminToken")
      const isEdit = !!formData._id
      const url = isEdit ? `/api/categories/${formData._id}` : "/api/categories"
      const method = isEdit ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setIsFormOpen(false)
        fetchCategories()
      }
    } catch (error) {
      console.error(error)
    }
  }
  const openEdit = (category: any) => {
    setFormData(category)
    setIsFormOpen(true)
  }
  const openNew = () => {
    setFormData({ _id: "", name: "", slug: "", description: "" })
    setIsFormOpen(true)
  }
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    if (!formData._id) {
      setFormData({
        ...formData,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
      })
    } else {
      setFormData({ ...formData, name })
    }
  }
  if (isLoading) return <div>Loading categories...</div>
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 ">Categories</h1>
        <button 
          onClick={openNew}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
        >
          <Plus size={16} />
          New Category
        </button>
      </div>
      {isFormOpen && (
        <div className="bg-white  p-6 rounded-2xl shadow-sm border border-zinc-200  mb-8">
          <h2 className="text-lg font-semibold mb-4">{formData._id ? "Edit Category" : "New Category"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={handleNameChange}
                  className="block w-full rounded-md border-0 py-1.5 px-3 ring-1 ring-inset ring-zinc-300  bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input 
                  type="text" 
                  required 
                  value={formData.slug} 
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 px-3 ring-1 ring-inset ring-zinc-300  bg-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 px-3 ring-1 ring-inset ring-zinc-300  bg-transparent"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-zinc-700  hover:bg-zinc-100  rounded-md"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md shadow-sm"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="bg-white  rounded-2xl shadow-sm border border-zinc-200  overflow-hidden">
        <table className="min-w-full divide-y divide-zinc-200 ">
          <thead className="bg-zinc-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase">Slug</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-zinc-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200  bg-white ">
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 ">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                  {category.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openEdit(category)} className="text-blue-600 hover:text-blue-900 mr-4 inline-block">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(category._id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-zinc-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
