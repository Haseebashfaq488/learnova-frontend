"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppHeader,
  Sidebar,
  Button,
  Badge,
  RadarChart,
  studentGlobalNavBranches,
  mockStudentGamificationState,
  mockEnrolledCoursesHub,
  mockStudentAnalytics,
} from "@learnova/ui";
import {
  GamificationBadge,
  DailyQuest,
  BadgeRarity,
  BadgeCategory,
} from "@learnova/types";
import {
  Award,
  Zap,
  Flame,
  Trophy,
  Target,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronRight,
  BookOpen,
  TrendingUp,
  Settings,
  Share2,
  Edit3,
  Lock,
  Star,
  Users,
  FlaskConical,
  Layers,
  ArrowUpRight,
  Check,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState<"gamification" | "academics" | "history" | "settings">("gamification");
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [gamificationState, setGamificationState] = useState(mockStudentGamificationState);
  const [claimedQuests, setClaimedQuests] = useState<Record<string, boolean>>({});
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [selectedBadgeModal, setSelectedBadgeModal] = useState<GamificationBadge | null>(null);

  // Profile edit form state
  const [profileForm, setProfileForm] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@learnova.edu",
    gradeLevel: "Grade 10 AP Scholar",
    school: "Westbridge STEM Academy",
    bio: "Passionate about physics, space exploration, and computational calculus. Aiming for a 5 on the AP Physics 1 exam!",
    weeklyGoalHours: 12,
    soundEffects: true,
    streakReminders: true,
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleClaimQuest = (quest: DailyQuest) => {
    if (claimedQuests[quest.id] || !quest.isCompleted) return;

    setClaimedQuests((prev) => ({ ...prev, [quest.id]: true }));
    setGamificationState((prev) => ({
      ...prev,
      currentXp: prev.currentXp + quest.xpReward,
      totalPoints: prev.totalPoints + quest.xpReward,
    }));

    setNotificationMessage(`🎉 Claimed +${quest.xpReward} XP for "${quest.title}"!`);
    setTimeout(() => setNotificationMessage(null), 4000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setNotificationMessage("Profile settings updated successfully!");
    setTimeout(() => {
      setIsSaved(false);
      setNotificationMessage(null);
    }, 3500);
  };

  // Badges filtering
  const filteredBadges = gamificationState.badges.filter((badge) => {
    const matchesRarity = selectedRarity === "all" || badge.rarity.toLowerCase() === selectedRarity.toLowerCase();
    const matchesCategory = selectedCategory === "all" || badge.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesRarity && matchesCategory;
  });

  const getRarityBadgeStyle = (rarity: BadgeRarity) => {
    switch (rarity) {
      case "Legendary":
        return "bg-gradient-to-r from-amber-500 to-amber-700 text-white border-amber-300 shadow-amber-200/50";
      case "Epic":
        return "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-300 shadow-purple-200/50";
      case "Rare":
        return "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-300 shadow-sky-200/50";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldAlert":
      case "ShieldCheck":
        return <ShieldCheck className="h-6 w-6" />;
      case "Flame":
        return <Flame className="h-6 w-6" />;
      case "FlaskConical":
        return <FlaskConical className="h-6 w-6" />;
      case "Sparkles":
        return <Sparkles className="h-6 w-6" />;
      case "Zap":
        return <Zap className="h-6 w-6" />;
      case "Award":
        return <Trophy className="h-6 w-6" />;
      case "Users":
        return <Users className="h-6 w-6" />;
      case "Layers":
        return <Layers className="h-6 w-6" />;
      default:
        return <Star className="h-6 w-6" />;
    }
  };

  const xpPercentage = Math.min(
    100,
    Math.round((gamificationState.currentXp / gamificationState.nextLevelXp) * 100)
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AppHeader
        portalName="Students"
        userName={profileForm.name}
        userRole="Student Scholar"
        avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
        notificationCount={3}
        streakDays={gamificationState.streakDays}
        currentXp={gamificationState.currentXp}
      />

      <div className="flex flex-1">
        <Sidebar
          branches={studentGlobalNavBranches}
          currentPath="/profile"
          footerContent={
            <div className="rounded-xl bg-gradient-to-br from-indigo-950 to-slate-900 p-3.5 text-white space-y-2 border border-indigo-800/40">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-400">
                <span className="flex items-center gap-1.5">
                  <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
                  14-Day Streak
                </span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">1.5x XP</span>
              </div>
              <p className="text-xs text-slate-300">
                Study today before midnight to protect your flame!
              </p>
              <Link href="/courses/ap-physics-1/practice">
                <Button size="sm" className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs mt-1">
                  Start Quick Practice (+50 XP)
                </Button>
              </Link>
            </div>
          }
        />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl">
          {/* Notification Alert Banner */}
          {notificationMessage && (
            <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-emerald-500 text-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-5 w-5" />
                <span>{notificationMessage}</span>
              </div>
              <button
                onClick={() => setNotificationMessage(null)}
                className="text-emerald-100 hover:text-white text-xs font-bold px-2 py-1 rounded"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Gamified Profile Header Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B2B53] via-[#103E75] to-[#1E293B] p-6 md:p-8 text-white shadow-xl border border-sky-900/40">
            {/* Ambient background glows */}
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />
            <div className="absolute right-1/3 -bottom-20 w-64 h-64 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Profile Avatar & Basic Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative">
                  <div className="h-24 w-24 md:h-28 md:w-28 rounded-2xl p-1 bg-gradient-to-tr from-amber-400 via-sky-400 to-indigo-500 shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                      alt={profileForm.name}
                      className="h-full w-full object-cover rounded-xl"
                    />
                  </div>
                  {/* Tier Crown Badge */}
                  <span className="absolute -bottom-2.5 -right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-xs font-black shadow-lg">
                    <Trophy className="h-3.5 w-3.5 fill-slate-950" />
                    {gamificationState.tier}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                      {profileForm.name}
                    </h1>
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/20 px-2.5 py-0.5 text-xs font-bold text-sky-300 border border-sky-400/30">
                      <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
                      ID #LN-8924
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 font-medium flex items-center gap-2">
                    <span>{profileForm.gradeLevel}</span>
                    <span>•</span>
                    <span className="text-sky-200">{profileForm.school}</span>
                  </p>

                  <p className="text-xs text-slate-300/80 max-w-xl line-clamp-2">
                    {profileForm.bio}
                  </p>
                </div>
              </div>

              {/* Right Metabar: Quick Gamification Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                <div className="text-center px-2">
                  <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Flame className="h-4 w-4 fill-amber-400 text-amber-400" />
                    Streak
                  </div>
                  <div className="text-xl md:text-2xl font-black text-white mt-0.5">
                    {gamificationState.streakDays} <span className="text-xs font-semibold text-slate-300">Days</span>
                  </div>
                </div>

                <div className="text-center px-2 border-l border-white/10">
                  <div className="flex items-center justify-center gap-1 text-sky-400 text-xs font-bold uppercase tracking-wider">
                    <Trophy className="h-4 w-4 text-sky-400" />
                    Cohort
                  </div>
                  <div className="text-xl md:text-2xl font-black text-white mt-0.5">
                    #{gamificationState.rankInCohort} <span className="text-xs font-semibold text-slate-300">of {gamificationState.totalCohortStudents}</span>
                  </div>
                </div>

                <div className="text-center px-2 border-l border-white/10">
                  <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Star className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                    Points
                  </div>
                  <div className="text-xl md:text-2xl font-black text-white mt-0.5">
                    {gamificationState.totalPoints.toLocaleString()}
                  </div>
                </div>

                <div className="text-center px-2 border-l border-white/10">
                  <div className="flex items-center justify-center gap-1 text-purple-400 text-xs font-bold uppercase tracking-wider">
                    <Award className="h-4 w-4 text-purple-400" />
                    Badges
                  </div>
                  <div className="text-xl md:text-2xl font-black text-white mt-0.5">
                    {gamificationState.badges.filter((b) => b.isUnlocked).length} <span className="text-xs font-semibold text-slate-300">/ {gamificationState.badges.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Level & XP Progression Strip */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-600 text-white font-black text-sm shadow-md">
                    L{gamificationState.level}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        Level {gamificationState.level}: {gamificationState.levelTitle}
                      </span>
                      <span className="text-xs font-medium text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-400/30">
                        {xpPercentage}% to Level {gamificationState.level + 1}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Next unlock: <span className="text-amber-300 font-medium">Relativistic Mechanics Lab + 250 Gems</span>
                    </p>
                  </div>
                </div>

                <div className="text-sm font-mono font-bold text-sky-200 self-end sm:self-center">
                  <span className="text-white text-base">{gamificationState.currentXp.toLocaleString()}</span> / {gamificationState.nextLevelXp.toLocaleString()} XP
                </div>
              </div>

              {/* Progress Bar with glowing fill */}
              <div className="h-3 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#00A8E8] via-sky-400 to-[#2ECC71] shadow-lg shadow-sky-500/40 transition-all duration-700 ease-out"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab("gamification")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "gamification"
                  ? "border-[#00A8E8] text-[#0B2B53]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Trophy className="h-4 w-4 text-amber-500" />
              Gamification & Trophies
            </button>

            <button
              onClick={() => setActiveTab("academics")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "academics"
                  ? "border-[#00A8E8] text-[#0B2B53]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <BookOpen className="h-4 w-4 text-sky-500" />
              Academic Progress & Radar
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "history"
                  ? "border-[#00A8E8] text-[#0B2B53]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <TrendingUp className="h-4 w-4 text-indigo-500" />
              XP & Milestone History
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "settings"
                  ? "border-[#00A8E8] text-[#0B2B53]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Settings className="h-4 w-4 text-slate-500" />
              Profile Settings
            </button>
          </div>

          {/* TAB 1: GAMIFICATION & TROPHIES */}
          {activeTab === "gamification" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Daily Quests Section */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Target className="h-5 w-5 text-rose-500" />
                      Daily Learning Quests
                    </h2>
                    <p className="text-xs text-slate-500">
                      Complete daily challenges to earn bonus XP and maintain your streak multiplier. Resets in 6h 45m.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 self-start sm:self-auto">
                    Today's Bounty: +350 XP
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {gamificationState.dailyQuests.map((quest) => {
                    const isClaimed = claimedQuests[quest.id] || quest.isClaimed;
                    const isReadyToClaim = quest.isCompleted && !isClaimed;

                    return (
                      <div
                        key={quest.id}
                        className={`relative rounded-2xl p-5 border transition-all ${
                          isClaimed
                            ? "bg-emerald-50/50 border-emerald-200"
                            : isReadyToClaim
                            ? "bg-gradient-to-b from-amber-50 to-white border-amber-300 shadow-md shadow-amber-500/10 ring-2 ring-amber-400/50"
                            : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                              isClaimed
                                ? "bg-emerald-100 text-emerald-700"
                                : isReadyToClaim
                                ? "bg-amber-100 text-amber-700 animate-pulse"
                                : "bg-sky-100 text-sky-700"
                            }`}
                          >
                            {quest.iconName === "FlaskConical" ? (
                              <FlaskConical className="h-5 w-5" />
                            ) : quest.iconName === "CheckCircle2" ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <Sparkles className="h-5 w-5" />
                            )}
                          </div>

                          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                            +{quest.xpReward} XP
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 mb-1">
                          {quest.title}
                        </h3>
                        <p className="text-xs text-slate-500 mb-4 min-h-[32px]">
                          {quest.description}
                        </p>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                            <span>Progress</span>
                            <span>
                              {quest.currentProgress} / {quest.targetProgress} {quest.unit}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isClaimed
                                  ? "bg-emerald-500"
                                  : isReadyToClaim
                                  ? "bg-amber-500"
                                  : "bg-[#00A8E8]"
                              }`}
                              style={{
                                width: `${Math.min(
                                  100,
                                  (quest.currentProgress / quest.targetProgress) * 100
                                )}%`,
                              }}
                            />
                          </div>

                          <div className="pt-2">
                            {isClaimed ? (
                              <div className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/60 rounded-xl">
                                <Check className="h-4 w-4" /> Claimed
                              </div>
                            ) : isReadyToClaim ? (
                              <Button
                                size="sm"
                                onClick={() => handleClaimQuest(quest)}
                                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
                              >
                                <Sparkles className="h-3.5 w-3.5 mr-1 fill-slate-950" /> Claim Reward!
                              </Button>
                            ) : (
                              <Link href="/courses/ap-physics-1/study">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50"
                                >
                                  Go to Task <ChevronRight className="h-3.5 w-3.5 ml-1" />
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trophy & Badges Showcase */}
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-amber-500" />
                      Awards & Badges Showcase
                    </h2>
                    <p className="text-xs text-slate-500">
                      Earn trophies through high exam scores, consistent streaks, and active AI investigations.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center bg-white rounded-xl p-1 border border-slate-200 shadow-sm text-xs font-semibold">
                      <button
                        onClick={() => setSelectedRarity("all")}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          selectedRarity === "all"
                            ? "bg-slate-900 text-white"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        All Rarity
                      </button>
                      <button
                        onClick={() => setSelectedRarity("legendary")}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          selectedRarity === "legendary"
                            ? "bg-amber-500 text-white font-bold"
                            : "text-amber-700 hover:bg-amber-50"
                        }`}
                      >
                        Legendary
                      </button>
                      <button
                        onClick={() => setSelectedRarity("epic")}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          selectedRarity === "epic"
                            ? "bg-purple-600 text-white font-bold"
                            : "text-purple-700 hover:bg-purple-50"
                        }`}
                      >
                        Epic
                      </button>
                      <button
                        onClick={() => setSelectedRarity("rare")}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          selectedRarity === "rare"
                            ? "bg-sky-600 text-white font-bold"
                            : "text-sky-700 hover:bg-sky-50"
                        }`}
                      >
                        Rare
                      </button>
                    </div>

                    <select
                      aria-label="Filter badges by category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    >
                      <option value="all">All Categories</option>
                      <option value="mastery">Mastery</option>
                      <option value="consistency">Consistency</option>
                      <option value="curiosity">Curiosity</option>
                      <option value="speed">Speed</option>
                      <option value="ai collaboration">AI Collaboration</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredBadges.map((badge) => {
                    return (
                      <div
                        key={badge.id}
                        onClick={() => setSelectedBadgeModal(badge)}
                        className={`relative group rounded-2xl p-5 border transition-all flex flex-col justify-between cursor-pointer ${
                          badge.isUnlocked
                            ? "bg-white border-slate-200/90 hover:border-sky-300 hover:shadow-lg shadow-sm"
                            : "bg-slate-50/80 border-dashed border-slate-300 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <div>
                          {/* Header pill & Rarity */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span
                              className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-sm ${getRarityBadgeStyle(
                                badge.rarity
                              )}`}
                            >
                              {badge.rarity}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400">
                              +{badge.xpReward} XP
                            </span>
                          </div>

                          {/* Icon representation */}
                          <div className="flex items-center justify-center my-4">
                            <div
                              className={`relative flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner transition-transform group-hover:scale-110 duration-300 ${
                                badge.isUnlocked
                                  ? badge.rarity === "Legendary"
                                    ? "bg-gradient-to-tr from-amber-400 to-amber-600 text-white shadow-amber-500/30 ring-4 ring-amber-100"
                                    : badge.rarity === "Epic"
                                    ? "bg-gradient-to-tr from-purple-500 to-indigo-600 text-white shadow-purple-500/30 ring-4 ring-purple-100"
                                    : "bg-gradient-to-tr from-sky-400 to-blue-600 text-white shadow-sky-500/30 ring-4 ring-sky-100"
                                  : "bg-slate-200 text-slate-400 ring-4 ring-slate-100"
                              }`}
                            >
                              {badge.isUnlocked ? (
                                getBadgeIcon(badge.icon)
                              ) : (
                                <Lock className="h-6 w-6 text-slate-400" />
                              )}
                            </div>
                          </div>

                          {/* Title & Description */}
                          <div className="text-center space-y-1">
                            <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                              {badge.name}
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                              {badge.description}
                            </p>
                          </div>
                        </div>

                        {/* Status Footer */}
                        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                          {badge.isUnlocked ? (
                            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-600">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Unlocked {badge.unlockedAt}</span>
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
                                <span>In Progress</span>
                                <span>{badge.progressPercent}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-slate-400 rounded-full"
                                  style={{ width: `${badge.progressPercent || 0}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cohort Leaderboard Standings Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-amber-500" />
                      Fall 2025 AP Physics • Cohort Leaderboard
                    </h2>
                    <p className="text-xs text-slate-500">
                      Ranked by total points & weekly study velocity across all physics problem sets.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 self-start sm:self-auto">
                    Weekly Reset in 2 Days
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {gamificationState.leaderboard.map((student) => (
                    <div
                      key={student.studentId}
                      className={`py-3.5 px-4 rounded-xl flex items-center justify-between gap-4 transition-colors ${
                        student.isCurrentUser
                          ? "bg-sky-50/80 border border-sky-200 shadow-sm"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Rank Badge */}
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl font-black text-xs ${
                            student.rank === 1
                              ? "bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-400/30"
                              : student.rank === 2
                              ? "bg-gradient-to-tr from-slate-300 to-slate-400 text-slate-900"
                              : student.rank === 3
                              ? "bg-gradient-to-tr from-amber-700 to-amber-800 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          #{student.rank}
                        </div>

                        {/* Avatar & Name */}
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatarUrl}
                            alt={student.name}
                            className="h-10 w-10 rounded-xl object-cover ring-2 ring-white shadow-sm"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">
                                {student.name}
                              </span>
                              {student.isCurrentUser && (
                                <span className="text-[10px] font-extrabold text-sky-700 bg-sky-200/80 px-1.5 py-0.2 rounded">
                                  YOU
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                              <span>Level {student.level}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-amber-600 font-semibold">
                                <Flame className="h-3 w-3 fill-amber-500 text-amber-500" />
                                {student.streakDays}d Streak
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Points & Weekly XP */}
                      <div className="text-right">
                        <div className="text-sm font-black text-slate-900">
                          {student.totalPoints.toLocaleString()} <span className="text-xs font-semibold text-slate-400">pts</span>
                        </div>
                        <div className="text-[11px] font-bold text-emerald-600">
                          +{student.weeklyXp.toLocaleString()} XP this week
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACADEMIC PROGRESS & RADAR */}
          {activeTab === "academics" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {/* Left Column: Radar Chart & Mastery Overview */}
              <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Target className="h-5 w-5 text-sky-500" />
                    Cognitive Concept Radar
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Multi-dimensional balance across AP Physics foundational competencies.
                  </p>
                </div>

                <div className="flex justify-center py-2">
                  <RadarChart
                    metrics={mockStudentAnalytics.radarMetrics}
                    width={460}
                    height={380}
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Overall Mastery Index</span>
                    <span className="font-bold text-emerald-600">77% (Above Cohort Median)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Weekly Study Velocity</span>
                    <span className="font-bold text-sky-600">14.2 Hours / Week</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Active Course Units</span>
                    <span className="font-bold text-slate-800">4 Enrolled Courses</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Enrolled Courses & Topic Progress */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-indigo-500" />
                      Active Enrolled Courses
                    </h3>
                    <Link href="/courses" className="text-xs font-bold text-[#00A8E8] hover:underline flex items-center gap-1">
                      View All Courses <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockEnrolledCoursesHub.slice(0, 4).map((course) => (
                      <div
                        key={course.id}
                        className="rounded-xl border border-slate-200 p-4 hover:border-sky-300 hover:shadow-md transition-all bg-slate-50/50 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                              {course.category}
                            </span>
                            <span className="font-semibold text-slate-500">
                              {course.completedPercent}% Complete
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-slate-900">
                            {course.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {course.highlightTopic}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                          <span className="text-[11px] text-slate-500 font-medium">
                            {course.completedLessons}/{course.totalLessons} Lessons
                          </span>
                          <Link href={`/courses/${course.id}/study`}>
                            <Button size="sm" variant="ghost" className="text-xs font-bold text-[#00A8E8] hover:bg-sky-50 h-7 px-2">
                              Resume Study →
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Topic Breakdown Bar Charts */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-slate-900">
                    Syllabus Mastery Breakdown
                  </h3>

                  <div className="space-y-3">
                    {mockStudentAnalytics.topicBreakdowns.map((topic, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span className="text-slate-800 font-semibold">{topic.topic}</span>
                          <span className="text-slate-600 font-bold">{topic.score}% Mastery</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              topic.score >= 85
                                ? "bg-emerald-500"
                                : topic.score >= 70
                                ? "bg-[#00A8E8]"
                                : "bg-amber-500"
                            }`}
                            style={{ width: `${topic.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: XP & MILESTONE HISTORY */}
          {activeTab === "history" && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-500" />
                    XP & Achievement Activity Log
                  </h3>
                  <p className="text-xs text-slate-500">
                    Track every experience point earned through quizzes, simulations, and streak milestones.
                  </p>
                </div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 self-start sm:self-auto">
                  Total XP Earned: {gamificationState.totalPoints.toLocaleString()}
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {gamificationState.recentActivities.map((activity) => (
                  <div key={activity.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shrink-0">
                        {activity.type === "simulation" ? (
                          <FlaskConical className="h-5 w-5 text-emerald-600" />
                        ) : activity.type === "streak" ? (
                          <Flame className="h-5 w-5 text-amber-500" />
                        ) : activity.type === "quiz" ? (
                          <CheckCircle2 className="h-5 w-5 text-sky-600" />
                        ) : activity.type === "milestone" ? (
                          <Trophy className="h-5 w-5 text-purple-600" />
                        ) : (
                          <Sparkles className="h-5 w-5 text-indigo-600" />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {activity.activityTitle}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-2">
                          <span className="font-medium text-slate-700">{activity.courseTitle}</span>
                          <span>•</span>
                          <span>{activity.timestamp}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shrink-0">
                      +{activity.xpEarned} XP
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE SETTINGS */}
          {activeTab === "settings" && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 max-w-3xl animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-slate-700" />
                  Edit Profile & Preferences
                </h3>
                <p className="text-xs text-slate-500">
                  Update your display information, learning goals, and gamification notifications.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Display Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full text-xs rounded-xl border border-slate-200 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      disabled
                      className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Academic Standing / Grade</label>
                    <input
                      type="text"
                      value={profileForm.gradeLevel}
                      onChange={(e) => setProfileForm({ ...profileForm, gradeLevel: e.target.value })}
                      className="w-full text-xs rounded-xl border border-slate-200 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">School / Institution</label>
                    <input
                      type="text"
                      value={profileForm.school}
                      onChange={(e) => setProfileForm({ ...profileForm, school: e.target.value })}
                      className="w-full text-xs rounded-xl border border-slate-200 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Student Bio</label>
                  <textarea
                    rows={3}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full text-xs rounded-xl border border-slate-200 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Gamification & Study Preferences
                  </h4>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Streak Protection Alerts</p>
                      <p className="text-[11px] text-slate-500">Send reminder notification 2 hours before daily streak reset.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profileForm.streakReminders}
                      onChange={(e) => setProfileForm({ ...profileForm, streakReminders: e.target.checked })}
                      className="h-4 w-4 rounded text-[#00A8E8] focus:ring-sky-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Interactive Sound Effects & Confetti</p>
                      <p className="text-[11px] text-slate-500">Play celebratory audio when claiming daily quests & leveling up.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profileForm.soundEffects}
                      onChange={(e) => setProfileForm({ ...profileForm, soundEffects: e.target.checked })}
                      className="h-4 w-4 rounded text-[#00A8E8] focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <Button
                    type="submit"
                    className="bg-[#0B2B53] hover:bg-slate-900 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md"
                  >
                    {isSaved ? "Saved!" : "Save Profile Changes"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Badge Details & Celebration Modal */}
          {selectedBadgeModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div
                className="relative w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedBadgeModal(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  ✕
                </button>

                <div className="text-center space-y-3">
                  <span
                    className={`inline-block text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm ${getRarityBadgeStyle(
                      selectedBadgeModal.rarity
                    )}`}
                  >
                    {selectedBadgeModal.rarity} Trophy
                  </span>

                  <div className="flex items-center justify-center py-2">
                    <div
                      className={`h-24 w-24 rounded-3xl flex items-center justify-center shadow-xl ${
                        selectedBadgeModal.isUnlocked
                          ? selectedBadgeModal.rarity === "Legendary"
                            ? "bg-gradient-to-tr from-amber-400 to-amber-600 text-white shadow-amber-500/30 ring-8 ring-amber-100"
                            : selectedBadgeModal.rarity === "Epic"
                            ? "bg-gradient-to-tr from-purple-500 to-indigo-600 text-white shadow-purple-500/30 ring-8 ring-purple-100"
                            : "bg-gradient-to-tr from-sky-400 to-blue-600 text-white shadow-sky-500/30 ring-8 ring-sky-100"
                          : "bg-slate-200 text-slate-400 ring-8 ring-slate-100"
                      }`}
                    >
                      {selectedBadgeModal.isUnlocked ? (
                        getBadgeIcon(selectedBadgeModal.icon)
                      ) : (
                        <Lock className="h-10 w-10 text-slate-400" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900">
                    {selectedBadgeModal.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {selectedBadgeModal.description}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-500">Achievement Reward</span>
                    <span className="font-extrabold text-amber-600">+{selectedBadgeModal.xpReward} XP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-500">Category</span>
                    <span className="font-bold text-slate-800">{selectedBadgeModal.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-500">Unlock Requirement</span>
                    <span className="font-medium text-slate-700 text-right max-w-[200px]">{selectedBadgeModal.criteria}</span>
                  </div>
                  {selectedBadgeModal.unlockedAt && (
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <span className="font-semibold text-slate-500">Earned Date</span>
                      <span className="font-bold text-emerald-600">{selectedBadgeModal.unlockedAt}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    onClick={() => {
                      setNotificationMessage(`Shared "${selectedBadgeModal.name}" achievement!`);
                      setSelectedBadgeModal(null);
                    }}
                    className="flex-1 bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="h-4 w-4" /> Share Achievement
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedBadgeModal(null)}
                    className="text-xs font-semibold text-slate-700 border-slate-200 rounded-xl"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
