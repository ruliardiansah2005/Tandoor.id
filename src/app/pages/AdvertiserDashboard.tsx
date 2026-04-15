import { useState } from "react";
import {
  TrendingUp,
  Eye,
  MousePointerClick,
  DollarSign,
  Target,
  Users,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartWrapper } from "../components/ChartWrapper";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function AdvertiserDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "campaigns" | "create">("overview");

  // Mock campaign data
  const campaigns = [
    {
      id: 1,
      name: "Pupuk Organik Premium - Dashboard Banner",
      status: "active",
      placement: "dashboard",
      impressions: 45230,
      clicks: 1820,
      ctr: 4.02,
      spent: 1250000,
      budget: 2000000,
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Marketplace - Benih Unggul",
      status: "active",
      placement: "marketplace",
      impressions: 32100,
      clicks: 965,
      ctr: 3.01,
      spent: 850000,
      budget: 1500000,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Sidebar Ads - Pestisida Organik",
      status: "paused",
      placement: "sidebar",
      impressions: 12450,
      clicks: 340,
      ctr: 2.73,
      spent: 420000,
      budget: 800000,
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=200&fit=crop",
    },
  ];

  const performanceData = [
    { date: "1 Apr", impressions: 4200, clicks: 145 },
    { date: "2 Apr", impressions: 4850, clicks: 178 },
    { date: "3 Apr", impressions: 5100, clicks: 192 },
    { date: "4 Apr", impressions: 4600, clicks: 165 },
    { date: "5 Apr", impressions: 5400, clicks: 210 },
    { date: "6 Apr", impressions: 5800, clicks: 235 },
    { date: "7 Apr", impressions: 6200, clicks: 258 },
  ];

  const audienceData = [
    { segment: "Petani Individu", percentage: 45 },
    { segment: "Koperasi", percentage: 25 },
    { segment: "Distributor", percentage: 20 },
    { segment: "Perusahaan", percentage: 10 },
  ];

  const stats = [
    {
      label: "Total Impressions",
      value: "89.8K",
      change: "+12.5%",
      icon: Eye,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Total Clicks",
      value: "3.1K",
      change: "+8.3%",
      icon: MousePointerClick,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Average CTR",
      value: "3.5%",
      change: "+0.4%",
      icon: Target,
      color: "from-purple-500 to-indigo-500",
    },
    {
      label: "Total Spent",
      value: "Rp 2.52M",
      change: "of Rp 4.3M",
      icon: DollarSign,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Advertising Dashboard</h1>
          <p className="text-slate-600">Kelola kampanye iklan Anda di platform Tandoor</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-8 border-b border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 md:px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap text-sm md:text-base ${
              activeTab === "overview"
                ? "border-green-600 text-green-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`px-3 md:px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap text-sm md:text-base ${
              activeTab === "campaigns"
                ? "border-green-600 text-green-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Campaigns
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-3 md:px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap text-sm md:text-base ${
              activeTab === "create"
                ? "border-green-600 text-green-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Create Campaign
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-green-600 font-medium">{stat.change}</div>
                  </div>
                );
              })}
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold mb-6">Performance Trend (7 Days)</h3>
              <ChartWrapper>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData} id="performance-trend-chart">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Legend />
                    <Line
                      key="line-impressions"
                      type="monotone"
                      dataKey="impressions"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Impressions"
                    />
                    <Line
                      key="line-clicks"
                      type="monotone"
                      dataKey="clicks"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Clicks"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>

            {/* Audience Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-semibold mb-6">Audience Breakdown</h3>
              <div className="space-y-4">
                {audienceData.map((segment, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-700 font-medium">{segment.segment}</span>
                      <span className="text-slate-600">{segment.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-600 to-emerald-600 h-3 rounded-full transition-all"
                        style={{ width: `${segment.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === "campaigns" && (
          <div className="space-y-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 h-40 md:h-auto bg-slate-100 flex-shrink-0">
                    <ImageWithFallback
                      src={campaign.image}
                      alt={campaign.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{campaign.name}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              campaign.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {campaign.status === "active" ? "Active" : "Paused"}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600">
                          Placement: <span className="font-medium capitalize">{campaign.placement}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          {campaign.status === "active" ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Impressions</div>
                        <div className="text-lg font-semibold">
                          {campaign.impressions.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Clicks</div>
                        <div className="text-lg font-semibold">{campaign.clicks.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">CTR</div>
                        <div className="text-lg font-semibold text-green-600">{campaign.ctr}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Spent</div>
                        <div className="text-lg font-semibold">
                          Rp {(campaign.spent / 1000000).toFixed(2)}M
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Budget</div>
                        <div className="text-lg font-semibold">
                          Rp {(campaign.budget / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>

                    {/* Budget Progress */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-600">Budget Used</span>
                        <span className="font-medium">
                          {((campaign.spent / campaign.budget) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all"
                          style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Campaign Tab */}
        {activeTab === "create" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Create New Campaign</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Pupuk Organik Premium"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ad Placement
                </label>
                <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="dashboard">Dashboard Banner (Large)</option>
                  <option value="marketplace">Marketplace Banner</option>
                  <option value="sidebar">Sidebar Ads (Small)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Target Audience
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Petani Individu", "Koperasi", "Distributor", "Perusahaan"].map((audience) => (
                    <label key={audience} className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input type="checkbox" className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{audience}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Daily Budget (Rp)
                  </label>
                  <input
                    type="number"
                    placeholder="100000"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Total Budget (Rp)
                  </label>
                  <input
                    type="number"
                    placeholder="2000000"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ad Creative (Image/Banner)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                  <div className="text-slate-600 mb-2">Click to upload or drag and drop</div>
                  <div className="text-sm text-slate-500">PNG, JPG up to 10MB</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ad Description/CTA
                </label>
                <textarea
                  rows={3}
                  placeholder="Tingkatkan hasil panen hingga 50% dengan pupuk organik berkualitas"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                >
                  Create Campaign
                </button>
                <button
                  type="button"
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all font-semibold"
                >
                  Save as Draft
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}