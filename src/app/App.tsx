import { useState } from 'react';
import { ChevronDown, Users, GraduationCap, UserCheck, Wrench, FileText, ClipboardList } from 'lucide-react';

const mockData = {
  centers: [
    {
      id: 1,
      name: 'Nairobi Center',
      branches: [
        { id: 'nai-1', name: 'Nairobi Branch A' },
        { id: 'nai-2', name: 'Nairobi Branch B' },
        { id: 'nai-3', name: 'Nairobi Branch C' }
      ],
      classes: [
        { id: 'nai-crib-1', name: 'Crib A', type: 'crib' },
        { id: 'nai-crib-2', name: 'Crib B', type: 'crib' },
        { id: 'nai-clicker-1', name: 'Clicker A', type: 'clicker' },
        { id: 'nai-quest-1', name: 'Quest A', type: 'quest' },
        { id: 'nai-quest-2', name: 'Quest B', type: 'quest' }
      ],
      lessons: [
        { id: 'l1', classId: 'nai-crib-1', number: 1, title: 'Intro to Crib', scheduledAt: '2026-05-01T09:00:00Z', completed: true },
        { id: 'l2', classId: 'nai-crib-1', number: 2, title: 'Crib Basics', scheduledAt: '2026-05-08T09:00:00Z', completed: true },
        { id: 'l3', classId: 'nai-crib-1', number: 3, title: 'Crib Advanced', scheduledAt: '2026-05-15T09:00:00Z', completed: false },
        { id: 'l4', classId: 'nai-clicker-1', number: 1, title: 'Clicker Intro', scheduledAt: '2026-05-03T11:00:00Z', completed: true },
        { id: 'l5', classId: 'nai-quest-1', number: 1, title: 'Quest Kickoff', scheduledAt: '2026-05-10T10:00:00Z', completed: false },
        { id: 'l6', classId: 'nai-quest-2', number: 1, title: 'Quest B Start', scheduledAt: '2026-05-12T10:00:00Z', completed: false }
      ],
      courses: [
        {
          id: 'c-nai-1',
          title: 'Introduction to Coding',
          type: 'crib',
          students: 42,
          sessions: [
            { id: 'c-nai-1-s1', number: 1, title: 'Intro', scheduledAt: '2026-05-01T09:00:00Z', completed: true },
            { id: 'c-nai-1-s2', number: 2, title: 'Variables', scheduledAt: '2026-05-08T09:00:00Z', completed: true },
            { id: 'c-nai-1-s3', number: 3, title: 'Loops', scheduledAt: '2026-05-15T09:00:00Z', completed: false }
          ]
        },
        {
          id: 'c-nai-2',
          title: 'Story Development',
          type: 'crib',
          students: 30,
          sessions: [
            { id: 'c-nai-2-s1', number: 1, title: 'Story Basics', scheduledAt: '2026-05-02T10:00:00Z', completed: true },
            { id: 'c-nai-2-s2', number: 2, title: 'Plot Development', scheduledAt: '2026-05-09T10:00:00Z', completed: false }
          ]
        },
        {
          id: 'c-nai-3',
          title: 'Clicker Basics',
          type: 'clicker',
          students: 25,
          sessions: [
            { id: 'c-nai-3-s1', number: 1, title: 'Clicker Intro', scheduledAt: '2026-05-03T11:00:00Z', completed: true }
          ]
        },
        {
          id: 'c-nai-4',
          title: 'Quest Fundamentals',
          type: 'quest',
          students: 20,
          sessions: [
            { id: 'c-nai-4-s1', number: 1, title: 'Quest Kickoff', scheduledAt: '2026-05-10T10:00:00Z', completed: false }
          ]
        }
      ],
      teachers: { total: 45, active: 38, inactive: 7, online: 12 },
      learners: { total: 320, active: 285, inactive: 35, online: 89 },
      parents: { total: 298, active: 245, inactive: 53, online: 67 },
      technicalMentors: { total: 8, active: 7, inactive: 1, online: 3 },
      assignments: {
        total: 156,
        submitted: 1245,
        retries: 234,
        issued: 1560,
        graded: 1198
      },
      weeklyAssignments: [
        { week: 'Week 1', submitted: 298, retries: 45, issued: 312, graded: 289 },
        { week: 'Week 2', submitted: 315, retries: 52, issued: 390, graded: 302 },
        { week: 'Week 3', submitted: 322, retries: 68, issued: 429, graded: 315 },
        { week: 'Week 4', submitted: 310, retries: 69, issued: 429, graded: 292 }
      ],
      studentMetrics: { completionRate: 87.5, passRate: 78.2, dropRate: 4.8 },
      qaVisits: { total: 24, weeklyScheduled: 2, surprise: 8, announced: 16 }
    },
    {
      id: 2,
      name: 'Mombasa Center',
      branches: [
        { id: 'mom-1', name: 'Mombasa Branch A' },
        { id: 'mom-2', name: 'Mombasa Branch B' }
      ],
      classes: [
        { id: 'mom-crib-1', name: 'Crib A', type: 'crib' },
        { id: 'mom-clicker-1', name: 'Clicker A', type: 'clicker' },
        { id: 'mom-quest-1', name: 'Quest A', type: 'quest' }
      ],
      lessons: [
        { id: 'm-l1', classId: 'mom-crib-1', number: 1, title: 'Crib Intro', scheduledAt: '2026-04-28T09:00:00Z', completed: true },
        { id: 'm-l2', classId: 'mom-crib-1', number: 2, title: 'Crib Followup', scheduledAt: '2026-05-05T09:00:00Z', completed: true },
        { id: 'm-l3', classId: 'mom-clicker-1', number: 1, title: 'Clicker Start', scheduledAt: '2026-05-20T11:00:00Z', completed: false }
      ],
      courses: [
        { id: 'c-mom-1', title: 'Crib: Basics', type: 'crib', students: 28, sessions: [ { id: 'c-mom-1-s1', number:1, title:'Intro', scheduledAt:'2026-04-28T09:00:00Z', completed:true } ] },
        { id: 'c-mom-2', title: 'Clicker Intro', type: 'clicker', students: 22, sessions: [ { id: 'c-mom-2-s1', number:1, title:'Start', scheduledAt:'2026-05-20T11:00:00Z', completed:false } ] }
      ],
      teachers: { total: 32, active: 28, inactive: 4, online: 9 },
      learners: { total: 245, active: 218, inactive: 27, online: 65 },
      parents: { total: 228, active: 195, inactive: 33, online: 52 },
      technicalMentors: { total: 6, active: 6, inactive: 0, online: 2 },
      assignments: {
        total: 118,
        submitted: 945,
        retries: 178,
        issued: 1180,
        graded: 892
      },
      weeklyAssignments: [
        { week: 'Week 1', submitted: 225, retries: 38, issued: 245, graded: 218 },
        { week: 'Week 2', submitted: 238, retries: 42, issued: 295, graded: 229 },
        { week: 'Week 3', submitted: 242, retries: 48, issued: 320, graded: 235 },
        { week: 'Week 4', submitted: 240, retries: 50, issued: 320, graded: 210 }
      ],
      studentMetrics: { completionRate: 82.3, passRate: 74.5, dropRate: 6.2 },
      qaVisits: { total: 18, weeklyScheduled: 2, surprise: 6, announced: 12 }
    },
    {
      id: 3,
      name: 'Kisumu Center',
      branches: [
        { id: 'kis-1', name: 'Kisumu Branch A' }
      ],
      classes: [
        { id: 'kis-crib-1', name: 'Crib A', type: 'crib' },
        { id: 'kis-quest-1', name: 'Quest A', type: 'quest' }
      ],
      lessons: [
        { id: 'k-l1', classId: 'kis-crib-1', number: 1, title: 'Crib 1', scheduledAt: '2026-04-20T09:00:00Z', completed: true },
        { id: 'k-l2', classId: 'kis-crib-1', number: 2, title: 'Crib 2', scheduledAt: '2026-04-27T09:00:00Z', completed: true },
        { id: 'k-l3', classId: 'kis-quest-1', number: 1, title: 'Quest 1', scheduledAt: '2026-05-14T09:00:00Z', completed: false }
      ],
      courses: [
        { id: 'c-kis-1', title: 'Crib: Foundations', type: 'crib', students: 18, sessions: [ { id: 'c-kis-1-s1', number:1, title:'Foundations', scheduledAt:'2026-04-20T09:00:00Z', completed:true } ] }
      ],
      teachers: { total: 28, active: 24, inactive: 4, online: 7 },
      learners: { total: 198, active: 172, inactive: 26, online: 48 },
      parents: { total: 185, active: 158, inactive: 27, online: 41 },
      technicalMentors: { total: 5, active: 5, inactive: 0, online: 2 },
      assignments: {
        total: 95,
        submitted: 762,
        retries: 142,
        issued: 950,
        graded: 715
      },
      weeklyAssignments: [
        { week: 'Week 1', submitted: 182, retries: 32, issued: 198, graded: 175 },
        { week: 'Week 2', submitted: 192, retries: 35, issued: 237, graded: 184 },
        { week: 'Week 3', submitted: 195, retries: 38, issued: 257, graded: 188 },
        { week: 'Week 4', submitted: 193, retries: 37, issued: 258, graded: 168 }
      ],
      studentMetrics: { completionRate: 79.8, passRate: 71.3, dropRate: 7.5 },
      qaVisits: { total: 15, weeklyScheduled: 1, surprise: 5, announced: 10 }
    },
    {
      id: 4,
      name: 'Eldoret Center',
      branches: [
        { id: 'eld-1', name: 'Eldoret Branch A' },
        { id: 'eld-2', name: 'Eldoret Branch B' }
      ],
      classes: [
        { id: 'eld-crib-1', name: 'Crib A', type: 'crib' },
        { id: 'eld-clicker-1', name: 'Clicker A', type: 'clicker' }
      ],
      lessons: [
        { id: 'e-l1', classId: 'eld-crib-1', number: 1, title: 'Crib Intro', scheduledAt: '2026-04-15T09:00:00Z', completed: true },
        { id: 'e-l2', classId: 'eld-clicker-1', number: 1, title: 'Clicker Intro', scheduledAt: '2026-05-18T11:00:00Z', completed: false }
      ],
      courses: [
        { id: 'c-eld-1', title: 'Crib Intro Course', type: 'crib', students: 14, sessions: [ { id: 'c-eld-1-s1', number:1, title:'Intro', scheduledAt:'2026-04-15T09:00:00Z', completed:true } ] }
      ],
      teachers: { total: 22, active: 19, inactive: 3, online: 6 },
      learners: { total: 165, active: 148, inactive: 17, online: 42 },
      parents: { total: 152, active: 132, inactive: 20, online: 35 },
      technicalMentors: { total: 4, active: 4, inactive: 0, online: 1 },
      assignments: {
        total: 78,
        submitted: 638,
        retries: 118,
        issued: 780,
        graded: 595
      },
      weeklyAssignments: [
        { week: 'Week 1', submitted: 152, retries: 27, issued: 165, graded: 145 },
        { week: 'Week 2', submitted: 162, retries: 29, issued: 195, graded: 155 },
        { week: 'Week 3', submitted: 165, retries: 31, issued: 210, graded: 158 },
        { week: 'Week 4', submitted: 159, retries: 31, issued: 210, graded: 137 }
      ],
      studentMetrics: { completionRate: 85.2, passRate: 76.8, dropRate: 5.1 },
      qaVisits: { total: 12, weeklyScheduled: 1, surprise: 4, announced: 8 }
    }
  ]
};

export default function App() {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Calculate overview totals
  const overviewTotals = mockData.centers.reduce((acc, center) => {
    acc.teachers.total += center.teachers.total;
    acc.teachers.active += center.teachers.active;
    acc.teachers.inactive += center.teachers.inactive;
    acc.teachers.online += center.teachers.online;

    acc.learners.total += center.learners.total;
    acc.learners.active += center.learners.active;
    acc.learners.inactive += center.learners.inactive;
    acc.learners.online += center.learners.online;

    acc.parents.total += center.parents.total;
    acc.parents.active += center.parents.active;
    acc.parents.inactive += center.parents.inactive;
    acc.parents.online += center.parents.online;

    acc.technicalMentors.total += center.technicalMentors.total;
    acc.technicalMentors.active += center.technicalMentors.active;
    acc.technicalMentors.inactive += center.technicalMentors.inactive;
    acc.technicalMentors.online += center.technicalMentors.online;

    return acc;
  }, {
    teachers: { total: 0, active: 0, inactive: 0, online: 0 },
    learners: { total: 0, active: 0, inactive: 0, online: 0 },
    parents: { total: 0, active: 0, inactive: 0, online: 0 },
    technicalMentors: { total: 0, active: 0, inactive: 0, online: 0 }
  });

  const handleCenterSelect = (center) => {
    setSelectedCenter(center);
    setDropdownOpen(false);
    if (typeof window !== 'undefined' && window.scrollTo) {
      // scroll to top so the center detail starts at the top of the page
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const handleBackToOverview = () => {
    setSelectedCenter(null);
    setDropdownOpen(false);
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Digifunzi Centers Dashboard</h1>
          <p className="text-gray-600">Overview and insights across all learning centers</p>
        </div>

        {/* Content Area */}
        {!selectedCenter ? (
          <OverviewView 
            centers={mockData.centers} 
            totals={overviewTotals} 
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            handleCenterSelect={handleCenterSelect}
            handleBackToOverview={handleBackToOverview}
          />
        ) : (
          <>
            {/* Center Selector */}
            <div className="mb-6">
              <div className="relative inline-block">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors min-w-64"
                >
                  <span className="text-gray-700">
                    {selectedCenter.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-64">
                    <button
                      onClick={handleBackToOverview}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100"
                    >
                      All Centers Overview
                    </button>
                    {mockData.centers.map((center) => (
                      <button
                        key={center.id}
                        onClick={() => handleCenterSelect(center)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50"
                      >
                        {center.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <CenterDetailView center={selectedCenter} />
          </>
        )}
      </div>
    </div>
  );
}

function OverviewView({ centers, totals, dropdownOpen, setDropdownOpen, handleCenterSelect, handleBackToOverview }) {
  // Calculate all users totals
  const allUsers = {
    total: totals.teachers.total + totals.learners.total + totals.parents.total + totals.technicalMentors.total,
    active: totals.teachers.active + totals.learners.active + totals.parents.active + totals.technicalMentors.active,
    inactive: totals.teachers.inactive + totals.learners.inactive + totals.parents.inactive + totals.technicalMentors.inactive,
    online: totals.teachers.online + totals.learners.online + totals.parents.online + totals.technicalMentors.online
  };

  return (
    <div className="space-y-6">
      {/* All Users Overview */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">All Users Overview</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Total Users</div>
              <div className="text-4xl font-bold text-brand-primary">{allUsers.total}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Active (90 days)</div>
              <div className="text-4xl font-bold text-brand-info">{allUsers.active}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Inactive (90 days)</div>
              <div className="text-4xl font-bold text-brand-accent">{allUsers.inactive}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Online (today)</div>
              <div className="text-4xl font-bold text-brand-info">{allUsers.online}</div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Role Statistics - Overview */}
      <div className="grid grid-cols-2 gap-6">
        <RoleStatsCard
          title="Teachers"
          icon={<GraduationCap className="w-5 h-5" />}
          stats={totals.teachers}
          color="blue"
        />
        <RoleStatsCard
          title="Learners"
          icon={<Users className="w-5 h-5" />}
          stats={totals.learners}
          color="green"
        />
        <RoleStatsCard
          title="Parents"
          icon={<UserCheck className="w-5 h-5" />}
          stats={totals.parents}
          color="purple"
        />
        <RoleStatsCard
          title="Technical Mentors"
          icon={<Wrench className="w-5 h-5" />}
          stats={totals.technicalMentors}
          color="orange"
        />
      </div>

      {/* Centers Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Centers Overview</h2>
          <div className="relative inline-block">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm"
            >
              <span className="text-gray-700">All Centers Overview</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                <button
                  onClick={() => { handleBackToOverview(); setDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100"
                >
                  All Centers Overview
                </button>
                {centers.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { handleCenterSelect(c); setDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {centers.map((center) => (
              <button
                key={center.id}
                onClick={() => handleCenterSelect(center)}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover-brand-primary transition-colors">
                    {center.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-info rounded-full"></div>
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Teachers</div>
                    <div className="text-lg font-bold text-brand-primary">{center.teachers.total}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Learners</div>
                    <div className="text-lg font-bold text-brand-primary">{center.learners.total}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Parents</div>
                    <div className="text-lg font-bold text-brand-primary">{center.parents.total}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Mentors</div>
                    <div className="text-lg font-bold text-brand-primary">{center.technicalMentors.total}</div>
                  </div>
                </div>

                {/* CenterStats removed from overview card per request */}

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-semibold text-brand-primary">{center.studentMetrics.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-brand-primary h-2 rounded-full transition-all"
                      style={{ width: `${center.studentMetrics.completionRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Pass Rate: </span>
                      <span className="font-semibold text-brand-info">{center.studentMetrics.passRate}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Drop Rate: </span>
                      <span className="font-semibold text-brand-accent">{center.studentMetrics.dropRate}%</span>
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover-brand-primary transition-colors rotate-[-90deg]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CenterDetailView({ center }) {
  const recentWeek = (center.weeklyAssignments && center.weeklyAssignments.length)
    ? center.weeklyAssignments[center.weeklyAssignments.length - 1]
    : null;

  const recentWeekMetrics = recentWeek ? {
    issued: recentWeek.issued || 0,
    submitted: recentWeek.submitted || 0,
    retries: recentWeek.retries || 0,
    graded: recentWeek.graded || 0,
    submittedPct: recentWeek.issued ? (recentWeek.submitted / recentWeek.issued) * 100 : 0,
    retryPct: recentWeek.submitted ? (recentWeek.retries / recentWeek.submitted) * 100 : 0,
    gradedPct: recentWeek.issued ? (recentWeek.graded / recentWeek.issued) * 100 : 0
  } : null;

  return (
    <div className="space-y-6">
      {/* CenterStats removed from detail view */}
      {/* Role Statistics */}
      <div className="grid grid-cols-2 gap-6">
        <RoleStatsCard
          title="Teachers"
          icon={<GraduationCap className="w-5 h-5" />}
          stats={center.teachers}
          color="blue"
        />
        <RoleStatsCard
          title="Learners"
          icon={<Users className="w-5 h-5" />}
          stats={center.learners}
          color="green"
        />
        <RoleStatsCard
          title="Parents"
          icon={<UserCheck className="w-5 h-5" />}
          stats={center.parents}
          color="purple"
        />
        <RoleStatsCard
          title="Technical Mentors"
          icon={<Wrench className="w-5 h-5" />}
          stats={center.technicalMentors}
          color="orange"
        />
      </div>

      {/* Assignments Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Assignments</h2>
          </div>
        </div>
        <div className="p-6">
          {/* Overall Assignments */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Overall Statistics</h3>
            <div className="grid grid-cols-4 gap-4">
              <StatBox label="Issued" value={center.assignments.issued} />
              <StatBox label="Submitted" value={center.assignments.submitted} />
              <StatBox
                label="Retries"
                value={center.assignments.retries}
                percentage={(center.assignments.retries / center.assignments.submitted * 100).toFixed(1)}
              />
              <StatBox
                label="Graded"
                value={center.assignments.graded}
                percentage={(center.assignments.graded / center.assignments.issued * 100).toFixed(1)}
              />
            </div>
          </div>

          {/* Weekly Assignments - card view */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Weekly Breakdown</h3>
            <div className="flex gap-4 overflow-x-auto py-2">
              {recentWeek && recentWeekMetrics ? (
                <div key={recentWeek.week} className="min-w-[220px] bg-gray-50 border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-gray-900">{recentWeek.week}</div>
                    <div className="text-xs text-gray-500"><span className="text-brand-primary font-semibold">{recentWeekMetrics.issued}</span> issued</div>
                  </div>

                  <div className="text-xs text-gray-500 mb-1">Submitted</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="progress-submitted h-2 rounded-full" style={{ width: `${Math.round(recentWeekMetrics.submittedPct)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <div>Submitted: <span className="text-brand-primary font-medium">{recentWeekMetrics.submitted}</span></div>
                    <div><span className="text-brand-info font-medium">{recentWeekMetrics.issued ? `${recentWeekMetrics.submittedPct.toFixed(0)}%` : '0%'}</span></div>
                  </div>

                  <div className="text-xs text-gray-500 mb-1">Retries</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="progress-retries h-2 rounded-full" style={{ width: `${Math.round(recentWeekMetrics.retryPct)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <div>Retries: <span className="text-brand-primary font-medium">{recentWeekMetrics.retries}</span></div>
                    <div><span className="text-brand-accent font-medium">{recentWeekMetrics.submitted ? `${recentWeekMetrics.retryPct.toFixed(0)}%` : '0%'}</span></div>
                  </div>

                  <div className="text-xs text-gray-500 mb-1">Graded</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="progress-graded h-2 rounded-full" style={{ width: `${Math.round(recentWeekMetrics.gradedPct)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <div>Graded: <span className="text-brand-primary font-medium">{recentWeekMetrics.graded}</span></div>
                    <div><span className="text-brand-primary font-medium">{recentWeekMetrics.issued ? `${recentWeekMetrics.gradedPct.toFixed(0)}%` : '0%'}</span></div>
                  </div>
                </div>
              ) : (
                /* Fallback: derive a simple weekly summary from overall assignments */
                (() => {
                  const issuedAll = center.assignments?.issued || 0;
                  const weeklyApprox = issuedAll ? Math.max(1, Math.round(issuedAll / 4)) : 20;
                  const todayApprox = Math.min(weeklyApprox, Math.max(1, Math.round(weeklyApprox / 7)));
                  const activities = [
                    { id: 'a1', label: 'Issued', count: Math.round(weeklyApprox * 0.6) },
                    { id: 'a2', label: 'Submitted', count: Math.round(weeklyApprox * 0.45) },
                    { id: 'a3', label: 'Graded', count: Math.round(weeklyApprox * 0.35) }
                  ];

                  return (
                    <div className="min-w-[260px] bg-gray-50 border border-gray-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold text-gray-900">This week</div>
                        <div className="text-xs text-gray-500"><span className="text-brand-primary font-semibold">{weeklyApprox}</span> assignments</div>
                      </div>

                      <div className="text-sm text-gray-700 mb-3">Today: <span className="text-brand-info font-semibold">{todayApprox}</span> events</div>

                      <div className="text-sm text-gray-600 mb-2">Recent activity</div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {activities.map((a) => (
                          <li key={a.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-brand-primary" />
                              <div>{a.label} today</div>
                            </div>
                            <div className="text-brand-primary font-medium">{a.count}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Student Metrics */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Student Performance Metrics</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            <MetricCard
              label="Completion Rate"
              value={center.studentMetrics.completionRate}
              unit="%"
              color="green"
            />
            <MetricCard
              label="Pass Rate"
              value={center.studentMetrics.passRate}
              unit="%"
              color="blue"
            />
            <MetricCard
              label="Drop Rate"
              value={center.studentMetrics.dropRate}
              unit="%"
              color="red"
            />
          </div>
        </div>
      </div>

      {/* QA Visits */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">QA Visits</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4">
            <StatBox label="Total Visits" value={center.qaVisits.total} />
            <StatBox label="Weekly Scheduled" value={center.qaVisits.weeklyScheduled} />
            <StatBox label="Surprise Visits" value={center.qaVisits.surprise} />
            <StatBox label="Announced Visits" value={center.qaVisits.announced} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, color }) {
  const colors = {
    blue: 'bg-brand-info-50 text-brand-info',
    green: 'bg-brand-primary-50 text-brand-primary',
    purple: 'bg-brand-accent-50 text-brand-accent',
    orange: 'bg-brand-accent-50 text-brand-accent'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className={`w-12 h-12 rounded-lg ${colors[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-brand-primary">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}

function RoleStatsCard({ title, icon, stats, color }) {
  const colors = {
    blue: 'bg-brand-info-50 text-brand-info',
    green: 'bg-brand-primary-50 text-brand-primary',
    purple: 'bg-brand-accent-50 text-brand-accent',
    orange: 'bg-brand-accent-50 text-brand-accent'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-lg ${colors[color]} flex items-center justify-center`}>
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Total</div>
            <div className="text-2xl font-bold text-brand-primary">{stats.total}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Active (90 days)</div>
            <div className="text-2xl font-bold text-brand-primary">{stats.active}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Inactive (90 days)</div>
            <div className="text-2xl font-bold text-brand-primary">{stats.inactive}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Online (today)</div>
            <div className="text-2xl font-bold text-brand-primary">{stats.online}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, percentage }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-xl font-bold text-brand-primary">{value}</div>
      {percentage && (
        <div className="text-sm text-brand-info mt-1">{percentage}%</div>
      )}
    </div>
  );
}

function MetricCard({ label, value, unit, color }) {
  const colors = {
    green: 'text-brand-primary',
    blue: 'text-brand-info',
    red: 'text-brand-accent'
  };

  return (
    <div className="text-center">
      <div className="text-sm text-gray-600 mb-2">{label}</div>
      <div className={`text-4xl font-bold ${colors[color]}`}>
        {value}{unit}
      </div>
    </div>
  );
}

function CenterStats({ center }) {
  const branches = center.branches || [];
  const branchCount = branches.length;

  const classes = center.classes || [];
  const classCounts = classes.reduce((acc, c) => {
    acc[c.type] = (acc[c.type] || 0) + 1;
    return acc;
  }, {});

  const lessons = center.lessons || [];
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(l => l.completed).length;

  const upcoming = lessons
    .filter(l => !l.completed)
    .sort((a, b) => {
      const at = a.scheduledAt ? new Date(a.scheduledAt).getTime() : Infinity;
      const bt = b.scheduledAt ? new Date(b.scheduledAt).getTime() : Infinity;
      return at - bt;
    })[0] || null;

  const formatDate = (iso) => {
    try { return iso ? new Date(iso).toLocaleString() : ''; } catch (e) { return iso; }
  };

  return (
    <div className="bg-gray-50 p-3 rounded-md border border-gray-100 text-sm text-gray-700">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Branches:</span>
          <span className="text-brand-primary font-semibold">{branchCount}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold">Classes:</span>
          <span>Crib <span className="text-brand-primary font-semibold">{classCounts.crib || 0}</span></span>
          <span>Clicker <span className="text-brand-primary font-semibold">{classCounts.clicker || 0}</span></span>
          <span>Quest <span className="text-brand-primary font-semibold">{classCounts.quest || 0}</span></span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold">Lessons:</span>
          <span><span className="text-brand-primary font-semibold">{completedLessons}</span>/<span className="text-brand-primary font-semibold">{totalLessons}</span> completed</span>
        </div>

        {upcoming && (
          <div className="ml-auto text-right">
            <div className="text-xs text-gray-600">Next</div>
            <div className="font-semibold text-gray-900">
              {upcoming.title} <span className="text-gray-500">({formatDate(upcoming.scheduledAt)})</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ClassScheduleView({ center }) {
  const [expanded, setExpanded] = useState({});
  const [expandedCourses, setExpandedCourses] = useState({});
  const classes = center.classes || [];
  const lessons = center.lessons || [];
  const courses = center.courses || [];

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleCourse = (id) => setExpandedCourses(prev => ({ ...prev, [id]: !prev[id] }));

  const formatDate = (iso) => {
    try { return iso ? new Date(iso).toLocaleString() : ''; } catch (e) { return iso; }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Classes & Schedule</h3>
      </div>

      <div className="space-y-3">
        {classes.length === 0 && (
          <div className="text-sm text-gray-600">No classes found for this center.</div>
        )}

        {classes.map((cls) => {
          const clsLessons = lessons.filter(l => l.classId === cls.id) || [];
          const total = clsLessons.length;
          const completed = clsLessons.filter(l => l.completed).length;
          const upcoming = clsLessons.filter(l => !l.completed).sort((a,b)=>{
            const at = a.scheduledAt ? new Date(a.scheduledAt).getTime() : Infinity;
            const bt = b.scheduledAt ? new Date(b.scheduledAt).getTime() : Infinity;
            return at-bt;
          })[0] || null;

          return (
            <div key={cls.id} className="bg-gray-50 p-3 rounded-md border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-gray-900">{cls.name}</div>
                    <div className="text-xs text-gray-500 px-2 py-0.5 bg-white border rounded">{cls.type}</div>
                  </div>

      {/* Courses & Schedule moved below Weekly Breakdown and Student Metrics (stray recursion removed) */}
                      <div className="text-sm text-gray-600 mt-1"><span className="text-brand-primary font-semibold">{completed}</span>/<span className="text-brand-primary font-semibold">{total}</span> lessons completed</div>
                  {upcoming && (
                    <div className="text-xs text-gray-500 mt-1">Next: {upcoming.title} — {formatDate(upcoming.scheduledAt)}</div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-36 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-brand-primary h-2 rounded-full"
                      style={{ width: total === 0 ? '0%' : `${Math.round((completed/total)*100)}%` }}
                    />
                  </div>
                  <button
                    onClick={() => toggle(cls.id)}
                    className="text-sm text-brand-info hover:underline"
                  >
                    {expanded[cls.id] ? 'Hide' : 'View lessons'}
                  </button>
                </div>
              </div>

              {expanded[cls.id] && (
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <ul className="space-y-2">
                    {clsLessons.length === 0 && (
                      <li className="text-sm text-gray-600">No lessons scheduled for this class.</li>
                    )}
                    {clsLessons.map((l) => (
                      <li key={l.id} className="flex items-center justify-between text-sm">
                        <div>
                              <div className="font-medium text-gray-900">Lesson <span className="text-brand-primary">{l.number}</span>: {l.title}</div>
                          <div className="text-xs text-gray-500">{formatDate(l.scheduledAt)} — {l.completed ? 'Completed' : 'Pending'}</div>
                        </div>
                        <div className="text-xs text-gray-600">{l.completed ? '✅' : '⏳'}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        {/* Courses grouped by level */}
        <div className="mt-4">
          <h4 className="text-md font-semibold text-gray-900 mb-2">Courses (by Level)</h4>
          <div className="space-y-3">
            {['crib','clicker','quest'].map((level) => {
              const levelCourses = courses.filter(c => c.type === level);
              if (levelCourses.length === 0) return null;

              return (
                <div key={level} className="bg-gray-50 p-3 rounded-md border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-900">{level.charAt(0).toUpperCase() + level.slice(1)}</div>
                    <div className="text-sm text-gray-600"><span className="text-brand-primary font-semibold">{levelCourses.length}</span> course(s)</div>
                  </div>

                  <div className="space-y-2">
                    {levelCourses.map((course) => {
                      const sessions = course.sessions || [];
                      const totalS = sessions.length;
                      const completedS = sessions.filter(s => s.completed).length;

                      return (
                        <div key={course.id} className="bg-white rounded-md p-3 border border-gray-100">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                <div className="font-medium text-gray-900">{course.title}</div>
                                <div className="text-xs text-gray-500"><span className="text-brand-primary font-medium">{course.students}</span> students</div>
                              </div>
                              <div className="text-sm text-gray-600 mt-1">Sessions: <span className="text-brand-primary font-semibold">{completedS}</span>/<span className="text-brand-primary font-semibold">{totalS}</span> completed</div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-40 bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                  className="bg-brand-primary h-2 rounded-full"
                                  style={{ width: totalS === 0 ? '0%' : `${Math.round((completedS/totalS)*100)}%` }}
                                />
                              </div>
                              <button
                                onClick={() => toggleCourse(course.id)}
                                className="text-sm text-brand-info hover:underline"
                              >
                                {expandedCourses[course.id] ? 'Hide' : 'View sessions'}
                              </button>
                            </div>
                          </div>

                          {expandedCourses[course.id] && (
                            <div className="mt-3 border-t border-gray-100 pt-3">
                              <ul className="space-y-2">
                                {sessions.length === 0 && (
                                  <li className="text-sm text-gray-600">No sessions for this course.</li>
                                )}
                                {sessions.map((s) => (
                                  <li key={s.id} className="flex items-center justify-between text-sm">
                                    <div>
                                      <div className="font-medium text-gray-900">Session <span className="text-brand-primary">{s.number}</span>: {s.title}</div>
                                      <div className="text-xs text-gray-500">{formatDate(s.scheduledAt)} — {s.completed ? 'Completed' : 'Pending'}</div>
                                    </div>
                                    <div className="text-xs text-gray-600">{s.completed ? '✅' : '⏳'}</div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}