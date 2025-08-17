import { useState } from 'react'
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Package, Heart, CreditCard, Settings, Bell, Shield, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  bio: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  preferences: {
    emailNotifications: boolean
    smsNotifications: boolean
    marketingEmails: boolean
    orderUpdates: boolean
  }
  stats: {
    totalOrders: number
    totalSpent: number
    wishlistItems: number
    reviewsWritten: number
  }
  memberSince: string
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Fashion enthusiast and tech lover. Always looking for the latest trends and innovative products.',
    address: {
      street: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
      orderUpdates: true
    },
    stats: {
      totalOrders: 24,
      totalSpent: 2847.50,
      wishlistItems: 12,
      reviewsWritten: 18
    },
    memberSince: '2022-03-15'
  })

  const [editedProfile, setEditedProfile] = useState(profile)

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    toast.success('Profile updated successfully!', {
      description: 'Your changes have been saved.'
    })
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const recentOrders = [
    { id: 'ORD-001', date: '2024-01-15', total: 299.99, status: 'Delivered', items: 2 },
    { id: 'ORD-002', date: '2024-01-10', total: 149.50, status: 'Shipped', items: 1 },
    { id: 'ORD-003', date: '2024-01-05', total: 89.99, status: 'Processing', items: 3 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="pt-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative group">
                  <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-2 right-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      {profile.name}
                    </h1>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500">
                        Premium Member
                      </Badge>
                      <Badge variant="outline">
                        Member since {new Date(profile.memberSince).getFullYear()}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 max-w-2xl">
                    {profile.bio}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="text-2xl font-bold text-primary">{profile.stats.totalOrders}</div>
                      <div className="text-sm text-muted-foreground">Orders</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="text-2xl font-bold text-primary">${profile.stats.totalSpent.toFixed(0)}</div>
                      <div className="text-sm text-muted-foreground">Total Spent</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="text-2xl font-bold text-primary">{profile.stats.wishlistItems}</div>
                      <div className="text-sm text-muted-foreground">Wishlist</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="text-2xl font-bold text-primary">{profile.stats.reviewsWritten}</div>
                      <div className="text-sm text-muted-foreground">Reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-muted/50 p-1 rounded-2xl shadow-lg">
            <TabsTrigger value="profile" className="rounded-xl font-semibold">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-xl font-semibold">
              <Package className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="rounded-xl font-semibold">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="payment" className="rounded-xl font-semibold">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-xl font-semibold">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Personal Information
                    </CardTitle>
                    <Button
                      variant={isEditing ? "destructive" : "outline"}
                      size="sm"
                      onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                    >
                      {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={isEditing ? editedProfile.name : profile.name}
                        onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editedProfile.email : profile.email}
                        onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={isEditing ? editedProfile.phone : profile.phone}
                      onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={isEditing ? editedProfile.bio : profile.bio}
                      onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  
                  {isEditing && (
                    <Button onClick={handleSave} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Address Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={isEditing ? editedProfile.address.street : profile.address.street}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile, 
                        address: {...editedProfile.address, street: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={isEditing ? editedProfile.address.city : profile.address.city}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile, 
                          address: {...editedProfile.address, city: e.target.value}
                        })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={isEditing ? editedProfile.address.state : profile.address.state}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile, 
                          address: {...editedProfile.address, state: e.target.value}
                        })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={isEditing ? editedProfile.address.zipCode : profile.address.zipCode}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile, 
                          address: {...editedProfile.address, zipCode: e.target.value}
                        })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={isEditing ? editedProfile.address.country : profile.address.country}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile, 
                          address: {...editedProfile.address, country: e.target.value}
                        })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-8">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Package className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{order.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()} • {order.items} items
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${order.total}</div>
                        <Badge 
                          className={cn(
                            "text-xs",
                            order.status === 'Delivered' && "bg-green-100 text-green-700",
                            order.status === 'Shipped' && "bg-blue-100 text-blue-700",
                            order.status === 'Processing' && "bg-yellow-100 text-yellow-700"
                          )}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={profile.preferences.emailNotifications}
                      onCheckedChange={(checked) => setProfile({
                        ...profile,
                        preferences: {...profile.preferences, emailNotifications: checked}
                      })}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      checked={profile.preferences.smsNotifications}
                      onCheckedChange={(checked) => setProfile({
                        ...profile,
                        preferences: {...profile.preferences, smsNotifications: checked}
                      })}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive promotional offers</p>
                    </div>
                    <Switch
                      checked={profile.preferences.marketingEmails}
                      onCheckedChange={(checked) => setProfile({
                        ...profile,
                        preferences: {...profile.preferences, marketingEmails: checked}
                      })}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Order Updates</Label>
                      <p className="text-sm text-muted-foreground">Get updates about your orders</p>
                    </div>
                    <Switch
                      checked={profile.preferences.orderUpdates}
                      onCheckedChange={(checked) => setProfile({
                        ...profile,
                        preferences: {...profile.preferences, orderUpdates: checked}
                      })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Account Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Two-Factor Authentication
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Privacy Settings
                  </Button>
                  
                  <Separator />
                  
                  <Button variant="destructive" className="w-full justify-start">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}