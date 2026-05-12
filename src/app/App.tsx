import { useState } from 'react';
import { ChevronDown, Users, GraduationCap, UserCheck, Wrench, FileText, ClipboardList } from 'lucide-react';

// Mock data
const mockData = {
  centers: [
    {
      id: 1,
      name: 'WoodCreek International School',
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
      teachers: { total: 45, active: 38, inactive: 7, online: 12 },
      learners: { total: 320, active: 285, inactive: 35, online: 89, gender: { male: 158, female: 162 } },
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
      qaVisits: { 
        total: 24, 
        weeklyScheduled: 2, 
        surprise: 8, 
        announced: 16,
        weeklyVisits: [
          {
            id: 1,
            date: '2026-05-08',
            type: 'scheduled',
            technicalMentor: 'John Kamau',
            visitedMentor: 'Mary Wanjiku',
            school: 'Nairobi Branch A',
            status: 'completed',
            rating: 4.5
          },
          {
            id: 2,
            date: '2026-05-10',
            type: 'surprise',
            technicalMentor: 'Sarah Ochieng',
            visitedMentor: 'James Muriithi',
            school: 'Nairobi Branch B',
            status: 'completed',
            rating: 4.2
          }
        ],
        recentVisits: [
          {
            id: 3,
            date: '2026-05-05',
            type: 'announced',
            technicalMentor: 'David Njoroge',
            visitedMentor: 'Grace Kiplagat',
            school: 'Nairobi Branch C',
            status: 'completed',
            rating: 4.8
          },
          {
            id: 4,
            date: '2026-05-03',
            type: 'scheduled',
            technicalMentor: 'John Kamau',
            visitedMentor: 'Peter Kimani',
            school: 'Nairobi Branch A',
            status: 'completed',
            rating: 4.0
          }
        ]
      }
    },
    {
      id: 2,
      name: 'Foresight Academy',
      branches: [
        { id: 'mom-1', name: 'Foresight Academy' },
        { id: 'mom-2', name: 'Foresight Academy' }
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
      teachers: { total: 32, active: 28, inactive: 4, online: 9 },
      learners: { total: 245, active: 218, inactive: 27, online: 65, gender: { male: 118, female: 127 } },
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
      qaVisits: { 
        total: 18, 
        weeklyScheduled: 2, 
        surprise: 6, 
        announced: 12,
        weeklyVisits: [
          {
            id: 5,
            date: '2026-05-09',
            type: 'scheduled',
            technicalMentor: 'Michael Ali',
            visitedMentor: 'Fatuma Hassan',
            school: 'Mombasa Branch A',
            status: 'completed',
            rating: 4.3
          },
          {
            id: 6,
            date: '2026-05-11',
            type: 'surprise',
            technicalMentor: 'Aisha Patel',
            visitedMentor: 'Hassan Omar',
            school: 'Mombasa Branch B',
            status: 'completed',
            rating: 4.6
          }
        ],
        recentVisits: [
          {
            id: 7,
            date: '2026-05-06',
            type: 'announced',
            technicalMentor: 'Michael Ali',
            visitedMentor: 'Mariam Said',
            school: 'Mombasa Branch A',
            status: 'completed',
            rating: 4.1
          }
        ]
      }
    },
    {
      id: 3,
      name: 'Holy Trinity Academy Kericho',
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
      teachers: { total: 28, active: 24, inactive: 4, online: 7 },
      learners: { total: 198, active: 172, inactive: 26, online: 48, gender: { male: 95, female: 103 } },
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
      qaVisits: { 
        total: 15, 
        weeklyScheduled: 1, 
        surprise: 5, 
        announced: 10,
        weeklyVisits: [
          {
            id: 8,
            date: '2026-05-07',
            type: 'scheduled',
            technicalMentor: 'Samuel Ochieng',
            visitedMentor: 'Grace Akinyi',
            school: 'Kisumu Branch A',
            status: 'completed',
            rating: 4.4
          }
        ],
        recentVisits: [
          {
            id: 9,
            date: '2026-05-04',
            type: 'surprise',
            technicalMentor: 'Lucy Wanjiru',
            visitedMentor: 'David Ochieng',
            school: 'Kisumu Branch A',
            status: 'completed',
            rating: 4.7
          }
        ]
      }
    },
    {
      id: 4,
      name: 'Heroes of The nation',
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
      teachers: { total: 22, active: 19, inactive: 3, online: 6 },
      learners: { total: 165, active: 148, inactive: 17, online: 42, gender: { male: 78, female: 87 } },
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
      qaVisits: { 
        total: 12, 
        weeklyScheduled: 1, 
        surprise: 4, 
        announced: 8,
        weeklyVisits: [
          {
            id: 10,
            date: '2026-05-06',
            type: 'scheduled',
            technicalMentor: 'Joseph Kiprop',
            visitedMentor: 'Emily Chebet',
            school: 'Eldoret Branch A',
            status: 'completed',
            rating: 4.6
          }
        ],
        recentVisits: [
          {
            id: 11,
            date: '2026-05-02',
            type: 'announced',
            technicalMentor: 'Rebecca Tanui',
            visitedMentor: 'Samuel Kiplagat',
            school: 'Eldoret Branch B',
            status: 'completed',
            rating: 4.3
          }
        ]
      }
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
    window.scrollTo(0, 0);
  };

  const handleBackToOverview = () => {
    setSelectedCenter(null);
    setDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f8fb] p-4 md:p-8">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col items-start gap-3 mb-2">
            <img 
              src="/src/assets/images/Logo-image.png" 
              alt="Digifunzi Logo" 
              className="h-20 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <h1 className="text-2xl font-bold text-[#25476a]">Digifunzi Centers Dashboard</h1>
            <p className="text-[#25476a] font-medium">Overview and insights across all learning centers</p>
          </div>
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
            {/* Center Header with Back Button */}
            <div className="mb-6 flex items-center gap-4">
              <button
                onClick={handleBackToOverview}
                className="bg-white border border-[#25476a] rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-[#f4f8fb] transition-colors"
              >
                <ChevronDown className="w-4 h-4 text-[#25476a] rotate-90" />
                <span className="text-[#25476a]">Back to Overview</span>
              </button>
              
              {/* Center Name */}
              <div className="bg-white border border-[#25476a] rounded-lg px-4 py-2 min-w-64">
                <span className="text-[#25476a] font-medium">
                  {selectedCenter.name}
                </span>
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
      <div className="bg-white rounded-lg border border-[#25476a]">
        <div className="p-6 border-b border-[#d9e7f2]">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#38aae1]" />
            <h2 className="text-xl font-semibold text-[#25476a]">All Users Overview</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-sm text-[#5d7690] mb-2">Total Users</div>
              <div className="text-4xl font-bold text-[#25476a]">{allUsers.total}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-[#5d7690] mb-2">Active (90 days)</div>
              <div className="text-4xl font-bold text-[#38aae1]">{allUsers.active}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-[#5d7690] mb-2">Inactive (90 days)</div>
              <div className="text-4xl font-bold text-[#feb139]">{allUsers.inactive}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-[#5d7690] mb-2">Online (today)</div>
              <div className="text-4xl font-bold text-[#25476a]">{allUsers.online}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Selector */}
      <div className="relative inline-block">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-white border border-[#25476a] rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-[#e9f6fc] transition-colors min-w-64"
        >
          <span className="text-[#25476a]">
            All Centers Overview
          </span>
          <ChevronDown className="w-4 h-4 text-[#38aae1]" />
        </button>

        {dropdownOpen && (
          <div className="absolute top-full mt-2 bg-white border border-[#25476a] rounded-lg shadow-lg z-10 min-w-64">
            <button
              onClick={handleBackToOverview}
              className="w-full text-left px-4 py-2 hover:bg-[#e9f6fc] border-b border-[#d9e7f2] text-[#25476a]"
            >
              All Centers Overview
            </button>
            {centers.map((center) => (
              <button
                key={center.id}
                onClick={() => handleCenterSelect(center)}
                className="w-full text-left px-4 py-2 hover:bg-[#e9f6fc] text-[#25476a]"
              >
                {center.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Role Statistics - Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      <div className="bg-white rounded-lg border border-[#25476a]">
        <div className="p-6 border-b border-[#d9e7f2]">
          <h2 className="text-xl font-semibold text-[#25476a]">Centers Overview</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {centers.map((center) => (
              <button
                key={center.id}
                onClick={() => handleCenterSelect(center)}
                className="bg-white border-2 border-[#d9e7f2] rounded-lg p-6 hover:border-[#38aae1] hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#25476a] group-hover:text-[#38aae1] transition-colors">
                    {center.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#38aae1] rounded-full"></div>
                    <span className="text-sm text-[#5d7690]">Active</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xs text-[#5d7690] mb-1">Teachers</div>
                    <div className="text-lg font-bold text-[#25476a]">{center.teachers.total}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-[#5d7690] mb-1">Learners</div>
                    <div className="text-lg font-bold text-[#25476a]">{center.learners.total}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-[#5d7690] mb-1">Parents</div>
                    <div className="text-lg font-bold text-[#25476a]">{center.parents.total}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-[#5d7690] mb-1">Mentors</div>
                    <div className="text-lg font-bold text-[#25476a]">{center.technicalMentors.total}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#5d7690]">Completion Rate</span>
                    <span className="font-semibold text-[#25476a]">{center.studentMetrics.completionRate}%</span>
                  </div>
                  <div className="w-full bg-[#d9e7f2] rounded-full h-2">
                    <div 
                      className="bg-[#38aae1] h-2 rounded-full transition-all"
                      style={{ width: `${center.studentMetrics.completionRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#d9e7f2] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-[#5d7690]">Pass Rate: </span>
                      <span className="font-semibold text-[#38aae1]">{center.studentMetrics.passRate}%</span>
                    </div>
                    <div>
                      <span className="text-[#5d7690]">Drop Rate: </span>
                      <span className="font-semibold text-[#feb139]">{center.studentMetrics.dropRate}%</span>
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-[#8db3ce] group-hover:text-[#38aae1] transition-colors rotate-[-90deg]" />
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
  return (
    <div className="space-y-6">
      {/* Role Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      <div className="bg-white rounded-lg border border-[#25476a]">
        <div className="p-6 border-b border-[#d9e7f2]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#38aae1]" />
            <h2 className="text-xl font-semibold text-[#25476a]">Assignments</h2>
          </div>
        </div>
        <div className="p-6">
          {/* Overall Assignments */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#25476a] mb-3">Overall Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

          {/* Weekly Assignments */}
          <div>
            <h3 className="text-sm font-medium text-[#25476a] mb-3">Weekly Breakdown</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Latest Week Summary */}
              <div className="bg-[#f4f8fb] rounded-lg border border-[#25476a] p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-[#25476a]">
                    {center.weeklyAssignments[center.weeklyAssignments.length - 1]?.week || 'Current Week'}
                  </h4>
                  <div className="text-xs text-[#38aae1] bg-white px-2 py-1 rounded border border-[#25476a]">
                    Latest Week
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-[#5d7690] mb-1">Assignments Issued</div>
                    <div className="text-2xl font-bold text-[#25476a]">
                      {center.weeklyAssignments[center.weeklyAssignments.length - 1]?.issued || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#5d7690] mb-1">Assignments Graded</div>
                    <div className="text-2xl font-bold text-[#38aae1]">
                      {center.weeklyAssignments[center.weeklyAssignments.length - 1]?.graded || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#5d7690] mb-1">Submissions</div>
                    <div className="text-2xl font-bold text-[#25476a]">
                      {center.weeklyAssignments[center.weeklyAssignments.length - 1]?.submitted || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#5d7690] mb-1">Completion Rate</div>
                    <div className="text-2xl font-bold text-[#38aae1]">
                      {center.weeklyAssignments[center.weeklyAssignments.length - 1] ? 
                        ((center.weeklyAssignments[center.weeklyAssignments.length - 1].graded / 
                          center.weeklyAssignments[center.weeklyAssignments.length - 1].issued) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Activity Summary */}
              <div className="bg-white rounded-lg border border-[#25476a] p-4">
                <h4 className="text-lg font-semibold text-[#25476a] mb-4">This Week's Activity</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#e9f6fc] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#38aae1] rounded-full"></div>
                      <span className="text-sm text-[#25476a]">Assignments Issued</span>
                    </div>
                    <span className="text-sm font-semibold text-[#25476a]">
                      {center.weeklyAssignments[center.weeklyAssignments.length - 1]?.issued || 0} new tasks
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#f0f9ff] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#25476a] rounded-full"></div>
                      <span className="text-sm text-[#25476a]">Student Submissions</span>
                    </div>
                    <span className="text-sm font-semibold text-[#25476a]">
                      {center.weeklyAssignments[center.weeklyAssignments.length - 1]?.submitted || 0} submissions
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#fff3d9] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#feb139] rounded-full"></div>
                      <span className="text-sm text-[#25476a]">Retry Requests</span>
                    </div>
                    <span className="text-sm font-semibold text-[#feb139]">
                      {center.weeklyAssignments[center.weeklyAssignments.length - 1]?.retries || 0} retries
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#e9f6fc] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#38aae1] rounded-full"></div>
                      <span className="text-sm text-[#25476a]">Sessions Completed</span>
                    </div>
                    <span className="text-sm font-semibold text-[#38aae1]">
                      {Math.floor((center.weeklyAssignments[center.weeklyAssignments.length - 1]?.graded || 0) / 3) || 0} of {Math.ceil((center.weeklyAssignments[center.weeklyAssignments.length - 1]?.issued || 0) / 3) || 0} sessions
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Weeks */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-[#25476a] mb-3">Previous Weeks</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {center.weeklyAssignments.slice(0, -1).reverse().slice(0, 3).map((week, index) => {
                  const completionPercentage = ((week.graded / week.issued) * 100).toFixed(1);
                  return (
                    <div key={index} className="bg-white border border-[#25476a] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-sm font-semibold text-[#25476a]">{week.week}</h5>
                        <span className="text-lg font-bold text-[#38aae1]">{completionPercentage}%</span>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full bg-[#d9e7f2] rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#38aae1] h-2 rounded-full transition-all"
                            style={{ width: `${completionPercentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-[#5d7690]">
                          <span>{week.graded} graded</span>
                          <span>of {week.issued} issued</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Metrics */}
      <div className="bg-white rounded-lg border border-[#25476a]">
        <div className="p-6 border-b border-[#d9e7f2]">
          <h2 className="text-xl font-semibold text-[#25476a]">Student Performance Metrics</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
      <div className="bg-white rounded-lg border border-[#25476a]">
        <div className="p-6 border-b border-[#d9e7f2]">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-[#38aae1]" />
            <h2 className="text-xl font-semibold text-[#25476a]">QA Visits</h2>
          </div>
        </div>
        <div className="p-6">
          {/* Overall QA Stats */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-[#25476a] mb-3">Overall QA Statistics</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatBox label="Total Visits" value={center.qaVisits.total} />
              <StatBox label="Weekly Scheduled" value={center.qaVisits.weeklyScheduled} />
              <StatBox label="Surprise Visits" value={center.qaVisits.surprise} />
              <StatBox label="Announced Visits" value={center.qaVisits.announced} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly QA Stats */}
            <div className="bg-[#f4f8fb] rounded-lg border border-[#25476a] p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-[#25476a]">This Week's QA Activity</h4>
                <div className="text-xs text-[#38aae1] bg-white px-2 py-1 rounded border border-[#25476a]">
                  Last 7 Days
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-[#5d7690] mb-1">Visits Completed</div>
                  <div className="text-2xl font-bold text-[#25476a]">
                    {center.qaVisits.weeklyVisits?.length || 0}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#5d7690] mb-1">Average Rating</div>
                  <div className="text-2xl font-bold text-[#38aae1]">
                    {center.qaVisits.weeklyVisits?.length ? 
                      (center.qaVisits.weeklyVisits.reduce((sum, visit) => sum + visit.rating, 0) / center.qaVisits.weeklyVisits.length).toFixed(1) : '0.0'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#5d7690] mb-1">Surprise Visits</div>
                  <div className="text-2xl font-bold text-[#feb139]">
                    {center.qaVisits.weeklyVisits?.filter(v => v.type === 'surprise').length || 0}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#5d7690] mb-1">Scheduled Visits</div>
                  <div className="text-2xl font-bold text-[#38aae1]">
                    {center.qaVisits.weeklyVisits?.filter(v => v.type === 'scheduled').length || 0}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent QA Visits */}
            <div className="bg-white rounded-lg border border-[#25476a] p-4">
              <h4 className="text-lg font-semibold text-[#25476a] mb-4">Recent QA Visits</h4>
              <div className="space-y-3">
                {(center.qaVisits.weeklyVisits || []).concat(center.qaVisits.recentVisits || []).slice(0, 2).map((visit) => (
                  <div key={visit.id} className="border border-[#25476a] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          visit.type === 'surprise' ? 'bg-[#feb139]' : 
                          visit.type === 'scheduled' ? 'bg-[#38aae1]' : 'bg-[#25476a]'
                        }`}></div>
                        <span className="text-sm font-medium text-[#25476a] capitalize">{visit.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-[#38aae1]">★</span>
                        <span className="text-xs text-[#5d7690]">{visit.rating}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#5d7690]">Technical Mentor:</span>
                        <span className="text-xs font-medium text-[#25476a]">{visit.technicalMentor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#5d7690]">Visited:</span>
                        <span className="text-xs font-medium text-[#25476a]">{visit.visitedMentor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#5d7690]">School:</span>
                        <span className="text-xs font-medium text-[#25476a]">{visit.school}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#5d7690]">Date:</span>
                        <span className="text-xs font-medium text-[#25476a]">{new Date(visit.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, color }) {
  const colors = {
    blue: 'bg-[#e9f6fc] text-[#38aae1]',
    green: 'bg-[#e9f6fc] text-[#25476a]',
    purple: 'bg-[#fff3d9] text-[#25476a]',
    orange: 'bg-[#fff3d9] text-[#feb139]'
  };

  return (
    <div className="bg-white rounded-lg border border-[#25476a] p-6">
      <div className={`w-12 h-12 rounded-lg ${colors[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-[#25476a]">{value}</div>
      <div className="text-sm text-[#5d7690] mt-1">{label}</div>
    </div>
  );
}

function RoleStatsCard({ title, icon, stats, color }) {
  const colors = {
    blue: 'bg-[#e9f6fc] text-[#38aae1]',
    green: 'bg-[#e9f6fc] text-[#25476a]',
    purple: 'bg-[#fff3d9] text-[#25476a]',
    orange: 'bg-[#fff3d9] text-[#feb139]'
  };

  return (
    <div className="bg-white rounded-lg border border-[#25476a]">
      <div className="p-6 border-b border-[#d9e7f2]">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-lg ${colors[color]} flex items-center justify-center`}>
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-[#25476a]">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="flex gap-6">
          {/* Left side - Main statistics */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-[#5d7690] mb-1">Total</div>
                <div className="text-2xl font-bold text-[#25476a]">{stats.total}</div>
              </div>
              <div>
                <div className="text-sm text-[#5d7690] mb-1">Active (90 days)</div>
                <div className="text-2xl font-bold text-[#25476a]">{stats.active}</div>
              </div>
              <div>
                <div className="text-sm text-[#5d7690] mb-1">Inactive (90 days)</div>
                <div className="text-2xl font-bold text-[#25476a]">{stats.inactive}</div>
              </div>
              <div>
                <div className="text-sm text-[#5d7690] mb-1">Online (today)</div>
                <div className="text-2xl font-bold text-[#25476a]">{stats.online}</div>
              </div>
            </div>
          </div>
          
          {/* Right side - Gender Distribution for Learners */}
          {title === 'Learners' && stats.gender && (
            <div className="w-32 border-l border-[#d9e7f2] pl-4">
              <div className="text-xs font-medium text-[#25476a] mb-2">Gender</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#25476a] rounded-full"></div>
                  <span className="text-xs text-[#5d7690]">M:</span>
                  <span className="text-sm font-bold text-[#25476a]">{stats.gender.male}</span>
                  <span className="text-xs text-[#38aae1]">
                    {((stats.gender.male / stats.total) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#feb139] rounded-full"></div>
                  <span className="text-xs text-[#5d7690]">F:</span>
                  <span className="text-sm font-bold text-[#25476a]">{stats.gender.female}</span>
                  <span className="text-xs text-[#38aae1]">
                    {((stats.gender.female / stats.total) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              {/* Compact visual representation */}
              <div className="mt-3">
                <div className="flex h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#25476a]"
                    style={{ width: `${((stats.gender.male / stats.total) * 100).toFixed(1)}%` }}
                  />
                  <div 
                    className="bg-[#feb139]"
                    style={{ width: `${((stats.gender.female / stats.total) * 100).toFixed(1)}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, percentage }) {
  return (
    <div className="bg-[#f4f8fb] rounded-lg p-4">
      <div className="text-sm text-[#5d7690] mb-1">{label}</div>
      <div className="text-xl font-bold text-[#25476a]">{value}</div>
      {percentage && (
        <div className="text-sm text-[#38aae1] mt-1">{percentage}%</div>
      )}
    </div>
  );
}

function MetricCard({ label, value, unit, color }) {
  const colors = {
    green: 'text-[#38aae1]',
    blue: 'text-[#25476a]',
    red: 'text-[#feb139]'
  };

  return (
    <div className="text-center">
      <div className="text-sm text-[#5d7690] mb-2">{label}</div>
      <div className={`text-4xl font-bold ${colors[color]}`}>
        {value}{unit}
      </div>
    </div>
  );
}

