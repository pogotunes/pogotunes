'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/animations'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useAuthStore } from '@/store/auth-store'
import type { Profile } from '@/types'
import {
  User, Lock, Bell, Eye, Volume2,
  Smartphone, Monitor, Save,
  Moon, Sun, Type, Palette, LogOut,
  Trash2
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user)
  const updateUser = useAuthStore((state) => state.updateUser)
  const logout = useAuthStore((state) => state.logout)

  const [profileForm, setProfileForm] = useState({
    name: user?.name ?? '',
    displayName: user?.displayName ?? '',
    bio: user?.profile?.bio ?? '',
    grade: user?.profile?.grade ?? '',
    school: user?.profile?.school ?? '',
    country: user?.profile?.country ?? '',
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [settings, setSettings] = useState({
    theme: user?.settings?.theme ?? 'dark',
    fontSize: user?.settings?.fontSize ?? 'large',
    soundEnabled: user?.settings?.soundEnabled ?? true,
    autoPlay: user?.settings?.autoPlay ?? true,
    reducedMotion: user?.settings?.reducedMotion ?? false,
    highContrast: user?.settings?.highContrast ?? false,
    emailNotifications: user?.settings?.emailNotifications ?? true,
    pushNotifications: user?.settings?.pushNotifications ?? true,
  })

  const handleProfileSave = async () => {
    updateUser({
      name: profileForm.name,
      displayName: profileForm.displayName,
      profile: {
        ...user?.profile,
        bio: profileForm.bio,
        grade: profileForm.grade,
        school: profileForm.school,
        country: profileForm.country,
      } as Profile,
    })
    toast.success('Profile updated!')
  }

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Password changed successfully!')
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        toast.error(data.error ?? 'Failed to change password')
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    )
    if (!confirmed) return

    try {
      const res = await fetch('/api/auth/delete-account', { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        await logout()
        window.location.href = '/'
      } else {
        toast.error(data.error ?? 'Failed to delete account')
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ]

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <h1 className="text-2xl font-baloo font-bold text-white">Settings</h1>
        <p className="text-white/50 font-nunito text-sm mt-1">Manage your account and preferences</p>
      </motion.div>

      <Tabs defaultValue="profile" variant="glass">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="profile" icon={<User className="w-4 h-4" />}>Profile</TabsTrigger>
          <TabsTrigger value="password" icon={<Lock className="w-4 h-4" />}>Password</TabsTrigger>
          <TabsTrigger value="preferences" icon={<Eye className="w-4 h-4" />}>Preferences</TabsTrigger>
          <TabsTrigger value="notifications" icon={<Bell className="w-4 h-4" />}>Notifications</TabsTrigger>
          <TabsTrigger value="danger" icon={<Trash2 className="w-4 h-4" />}>Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <motion.div variants={fadeInUp}>
            <Card variant="glass" className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-coral" /> Profile Information
                </CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm((p) => ({ ...p, name: e.target.value }))}
                    icon={<User className="w-4 h-4" />}
                  />
                  <Input
                    label="Display Name"
                    value={profileForm.displayName}
                    onChange={(e) => setProfileForm((p) => ({ ...p, displayName: e.target.value }))}
                  />
                  <Input
                    label="Bio"
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm((p) => ({ ...p, bio: e.target.value }))}
                  />
                  <Input
                    label="Grade"
                    value={profileForm.grade}
                    onChange={(e) => setProfileForm((p) => ({ ...p, grade: e.target.value }))}
                  />
                  <Input
                    label="School"
                    value={profileForm.school}
                    onChange={(e) => setProfileForm((p) => ({ ...p, school: e.target.value }))}
                  />
                  <Input
                    label="Country"
                    value={profileForm.country}
                    onChange={(e) => setProfileForm((p) => ({ ...p, country: e.target.value }))}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="coral" icon={<Save className="w-4 h-4" />} onClick={handleProfileSave}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="password">
          <motion.div variants={fadeInUp}>
            <Card variant="glass" className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-coral" /> Change Password
                </CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                  icon={<Lock className="w-4 h-4" />}
                />
                <Input
                  label="New Password"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                  icon={<Lock className="w-4 h-4" />}
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                  icon={<Lock className="w-4 h-4" />}
                />
              </CardContent>
              <CardFooter>
                <Button variant="coral" icon={<Save className="w-4 h-4" />} onClick={handlePasswordChange}>
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="preferences">
          <motion.div variants={fadeInUp}>
            <Card variant="glass" className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-coral" /> Display Preferences
                </CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-nunito text-white/70 mb-2 block">Theme</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSettings((s) => ({ ...s, theme: 'dark' }))}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-nunito text-sm font-semibold transition-all ${
                        settings.theme === 'dark'
                          ? 'bg-white/15 text-white ring-2 ring-coral'
                          : 'bg-white/5 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      <Moon className="w-4 h-4" /> Dark
                    </button>
                    <button
                      onClick={() => setSettings((s) => ({ ...s, theme: 'light' }))}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-nunito text-sm font-semibold transition-all ${
                        settings.theme === 'light'
                          ? 'bg-white/15 text-white ring-2 ring-coral'
                          : 'bg-white/5 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      <Sun className="w-4 h-4" /> Light
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-nunito text-white/70 mb-2 block">Font Size</label>
                  <div className="flex gap-3">
                    {fontSizeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSettings((s) => ({ ...s, fontSize: opt.value }))}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-nunito text-sm font-semibold transition-all ${
                          settings.fontSize === opt.value
                            ? 'bg-white/15 text-white ring-2 ring-coral'
                            : 'bg-white/5 text-white/50 hover:bg-white/10'
                        }`}
                      >
                        <Type className="w-4 h-4" /> {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { key: 'soundEnabled', label: 'Sound Effects', icon: Volume2 },
                    { key: 'autoPlay', label: 'Auto-play Videos', icon: Monitor },
                    { key: 'reducedMotion', label: 'Reduced Motion', icon: Smartphone },
                    { key: 'highContrast', label: 'High Contrast', icon: Palette },
                  ].map((item) => {
                    const isOn = settings[item.key as keyof typeof settings] as boolean
                    return (
                      <label
                        key={item.key}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4 text-white/50" />
                          <span className="text-sm font-nunito text-white/70">{item.label}</span>
                        </div>
                        <button
                          role="switch"
                          aria-checked={isOn}
                          onClick={() => setSettings((s) => ({ ...s, [item.key]: !isOn }))}
                          className={`w-10 h-6 rounded-full transition-colors relative ${
                            isOn ? 'bg-coral' : 'bg-white/20'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                              isOn ? 'translate-x-[18px]' : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      </label>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div variants={fadeInUp}>
            <Card variant="glass" className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-coral" /> Notification Settings
                </CardTitle>
                <CardDescription>Manage how we contact you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications in your browser' },
                ].map((item) => {
                  const isOn = settings[item.key as keyof typeof settings] as boolean
                  return (
                    <label
                      key={item.key}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <div>
                        <div className="text-sm font-baloo font-bold text-white">{item.label}</div>
                        <div className="text-xs text-white/40 font-nunito mt-0.5">{item.desc}</div>
                      </div>
                      <button
                        role="switch"
                        aria-checked={isOn}
                        onClick={() => setSettings((s) => ({ ...s, [item.key]: !isOn }))}
                        className={`w-10 h-6 rounded-full transition-colors relative shrink-0 ${
                          isOn ? 'bg-coral' : 'bg-white/20'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            isOn ? 'translate-x-[18px]' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </label>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="danger">
          <motion.div variants={fadeInUp}>
            <Card variant="outline" className="p-6 border-red-500/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-coral">
                  <Trash2 className="w-5 h-5" /> Danger Zone
                </CardTitle>
                <CardDescription>Irreversible account actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <h3 className="text-sm font-baloo font-bold text-coral mb-1">Delete Account</h3>
                  <p className="text-xs text-white/50 font-nunito mb-3">
                    Permanently delete your account and all associated data. This cannot be undone.
                  </p>
                  <Button variant="coral" icon={<Trash2 className="w-4 h-4" />} onClick={handleDeleteAccount}>
                    Delete My Account
                  </Button>
                </div>

                <div className="p-4 rounded-xl bg-white/5">
                  <h3 className="text-sm font-baloo font-bold text-white mb-1">Sign Out</h3>
                  <p className="text-xs text-white/50 font-nunito mb-3">Sign out of your account on this device.</p>
                  <Button variant="glass" icon={<LogOut className="w-4 h-4" />} onClick={logout}>
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
