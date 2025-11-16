/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getBlogStats, getProjectStats } from "@/services/AdminServices";
import { getAllUsers } from "@/services/UserServices";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function AdminDashboardCharts() {
  const [blogStats, setBlogStats] = useState<any>(null);
  const [projectStats, setProjectStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [blog, project, users] = await Promise.all([
          getBlogStats(),
          getProjectStats(),
          getAllUsers(),
        ]);

        setBlogStats(blog);
        setProjectStats(project);
        setUsers(users);
      } catch (error) {
        console.error("Failed to load stats", error);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  if (loading || !blogStats || !projectStats) {
    return <div className="flex items-center justify-center gap-2 p-4">
          <Loader className="h-8 w-8 animate-spin text-yellow-700" />
          <span className="text-xl font-medium text-yellow-700">Loading...</span>
        </div>;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl mt-2 font-bold">{users.length}</p>
        </div>

        <div className="p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Blog Posts</h2>
          <p className="text-3xl mt-2 font-bold">{blogStats?.stats?.totalPosts}</p>
        </div>

        <div className="p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Projects</h2>
          <p className="text-3xl mt-2 font-bold">{projectStats?.stats?.totalProjects}</p>
        </div>
      </div>

      {/* Blog Views Chart */}
      <div className="p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Blog Views Stats</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "Avg Views", value: blogStats?.stats?.avgViews },
              { name: "Max Views", value: blogStats?.stats?.maxViews },
              { name: "Min Views", value: blogStats?.stats?.minViews },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#ca8a04" /> 
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Project Stats → LINE CHART (changed) */}
      <div className="p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Featured Projects Trend</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={[
              { name: "Featured", value: projectStats?.featured?.count },
              {
                name: "Others",
                value:
                  projectStats?.stats?.totalProjects -
                  projectStats?.featured?.count,
              },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#ca8a04" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Users Overview → PIE CHART (changed) */}
      <div className="p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Users Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: "Total Users", value: users.length },
              ]}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              <Cell fill="#ca8a04" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}