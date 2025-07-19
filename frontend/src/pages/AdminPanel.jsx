// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import jsPDF from "jspdf";
// // import "jspdf-autotable";
// // import {
// //   Shield,
// //   Users,
// //   Download,
// //   Eye,
// //   Search,
// //   FileText,
// //   BarChart3,
// //   User,
// //   Phone,
// // } from "lucide-react";
// // import { Button } from "@/components/ui/button.jsx";
// // import { Input } from "@/components/ui/input.jsx";
// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card.jsx";
// // import { useToast } from "@/hooks/use-toast.js";
// // import Header from "../components/Header";
// // import Footer from "../components/Footer";
// // import { API_BASE_URL } from "../config";

// // const AdminPanel = () => {
// //   const [users, setUsers] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const { toast } = useToast();

// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const res = await axios.get(`${API_BASE_URL}/api/auth/allSosDetails`);
// //         setUsers(res.data || []);
// //       } catch (err) {
// //         console.error("Failed to fetch users", err);
// //       }
// //     };
// //     fetchUsers();
// //   }, []);

// //   const exportToPDF = () => {
// //     setIsLoading(true);
// //     const doc = new jsPDF();
// //     doc.text("SOS User Data", 14, 10);
// //     const tableColumn = ["Name", "Email", "Phone", "Status", "Contacts"];
// //     const tableRows = filteredUsers.map((user) => [
// //       user.personalInfo?.fullName || "N/A",
// //       user.useremail,
// //       user.mobile,
// //       user.status || "Active",
// //       user.emergencyContacts?.length || 0,
// //     ]);
// //     doc.autoTable({
// //       head: [tableColumn],
// //       body: tableRows,
// //       startY: 20,
// //     });
// //     doc.save("sos_users_data.pdf");
// //     toast({
// //       title: "PDF Export Successful",
// //       description: "User data exported successfully!",
// //     });
// //     setIsLoading(false);
// //   };

// //   const exportToCSV = () => {
// //     const csvContent = [
// //       [
// //         "Name",
// //         "Email",
// //         "Phone",
// //         "Join Date",
// //         "Status",
// //         "Emergency Contacts",
// //         "Last Active",
// //       ],
// //       ...filteredUsers.map((user) => [
// //         user.personalInfo?.fullName || "N/A",
// //         user.useremail,
// //         user.mobile,
// //         new Date(user.createdAt).toLocaleDateString(),
// //         user.status || "Active",
// //         user.emergencyContacts?.length || 0,
// //         new Date(user.updatedAt || user.createdAt).toLocaleDateString(),
// //       ]),
// //     ]
// //       .map((row) => row.join(","))
// //       .join("\n");

// //     const blob = new Blob([csvContent], { type: "text/csv" });
// //     const url = window.URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = "sos_users_data.csv";
// //     a.click();
// //     window.URL.revokeObjectURL(url);

// //     toast({
// //       title: "CSV Export Successful",
// //       description: "User data has been exported to CSV successfully!",
// //     });
// //   };

// //   const openUserModal = (user) => {
// //     setSelectedUser(user);
// //     setIsModalOpen(true);
// //   };

// //   const closeUserModal = () => {
// //     setSelectedUser(null);
// //     setIsModalOpen(false);
// //   };

// //   const stats = {
// //     totalUsers: users.length,
// //     activeUsers: users.filter((u) => u.status !== "Inactive").length,
// //     inactiveUsers: users.filter((u) => u.status === "Inactive").length,
// //     avgContacts:
// //       users.length > 0
// //         ? Math.round(
// //             users.reduce(
// //               (sum, u) => sum + (u.emergencyContacts?.length || 0),
// //               0
// //             ) / users.length
// //           )
// //         : 0,
// //   };
// //   const [loadingPDF, setLoadingPDF] = useState(false);

// //   // useEffect(() => {
// //   //   const fetchUsers = async () => {
// //   //     try {
// //   //       const res = await axios.get(`${API_BASE_URL}/api/auth/allSosDetails`);
// //   //       setUsers(res.data || []);
// //   //     } catch (err) {
// //   //       console.error("Failed to fetch users", err);
// //   //     }
// //   //   };
// //   //   fetchUsers();
// //   // }, []);

// //   const filteredUsers = users.filter(
// //     (user) =>
// //       user.personalInfo?.fullName
// //         ?.toLowerCase()
// //         .includes(searchTerm.toLowerCase()) ||
// //       user.useremail?.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const exportAllUsersPDF = () => {
// //     setIsLoading(true);
// //     setTimeout(() => {
// //       const doc = new jsPDF();
// //       doc.setFontSize(16);
// //       doc.text("SOS Full User Details", 14, 15);

// //       let y = 25;
// //       filteredUsers.forEach((user, index) => {
// //         if (index !== 0) y += 5;
// //         doc.setFontSize(12);
// //         doc.text(`User #${index + 1}`, 14, y);
// //         y += 6;
// //         doc.text(`Name: ${user.personalInfo?.fullName || "N/A"}`, 14, y);
// //         y += 6;
// //         doc.text(`Email: ${user.useremail}`, 14, y);
// //         y += 6;
// //         doc.text(`Phone: ${user.mobile}`, 14, y);
// //         y += 6;
// //         doc.text(`Blood Type: ${user.personalInfo?.bloodType || "N/A"}`, 14, y);
// //         y += 6;
// //         doc.text(
// //           `Medical: ${user.personalInfo?.medicalConditions || "N/A"}`,
// //           14,
// //           y
// //         );
// //         y += 6;
// //         doc.text(`Allergies: ${user.personalInfo?.allergies || "N/A"}`, 14, y);
// //         y += 6;
// //         doc.text(`Home: ${user.locationInfo?.homeAddress || "N/A"}`, 14, y);
// //         y += 6;
// //         doc.text(`Work: ${user.locationInfo?.workAddress || "N/A"}`, 14, y);
// //         y += 6;
// //         doc.text(`Status: ${user.status || "Active"}`, 14, y);
// //         y += 6;

// //         doc.text(`Contacts:`, 14, y);
// //         y += 5;
// //         user.emergencyContacts?.forEach((c, i) => {
// //           doc.text(`${i + 1}. ${c.name} (${c.relation}) - ${c.phone}`, 16, y);
// //           y += 5;
// //         });

// //         if (y > 270) {
// //           doc.addPage();
// //           y = 20;
// //         }
// //       });

// //       doc.save("sos_full_users_report.pdf");
// //       toast({
// //         title: "PDF Export Successful",
// //         description: "All user details have been exported!",
// //       });
// //       setIsLoading(false);
// //     }, 100);
// //   };

// //   const generateUserPDF = (user) => {
// //     setLoadingPDF(true);
// //     setTimeout(() => {
// //       const doc = new jsPDF();
// //       doc.setFontSize(16);
// //       doc.text(`SOS User Report - ${user.personalInfo?.fullName}`, 14, 15);

// //       let y = 30;
// //       doc.setFontSize(12);
// //       doc.text("Personal Info", 14, y);
// //       y += 8;
// //       doc.text(`Name: ${user.personalInfo?.fullName}`, 14, y);
// //       y += 6;
// //       doc.text(`DOB: ${user.personalInfo?.dob}`, 14, y);
// //       y += 6;
// //       doc.text(`Blood Type: ${user.personalInfo?.bloodType}`, 14, y);
// //       y += 6;
// //       doc.text(
// //         `Medical Conditions: ${user.personalInfo?.medicalConditions}`,
// //         14,
// //         y
// //       );
// //       y += 6;
// //       doc.text(`Allergies: ${user.personalInfo?.allergies}`, 14, y);
// //       y += 6;
// //       doc.text(`Medications: ${user.personalInfo?.medications}`, 14, y);
// //       y += 10;

// //       doc.text("Location Info", 14, y);
// //       y += 8;
// //       doc.text(`Home: ${user.locationInfo?.homeAddress}`, 14, y);
// //       y += 6;
// //       doc.text(`Work: ${user.locationInfo?.workAddress}`, 14, y);
// //       y += 6;
// //       doc.text(`Frequent: ${user.locationInfo?.frequentLocations}`, 14, y);
// //       y += 10;

// //       doc.text("Emergency Contacts", 14, y);
// //       y += 8;
// //       user.emergencyContacts?.forEach((c, i) => {
// //         doc.text(`${i + 1}. ${c.name} (${c.relation}) - ${c.phone}`, 14, y);
// //         y += 6;
// //       });

// //       doc.save(`${user.personalInfo?.fullName}_sos_report.pdf`);
// //       setLoadingPDF(false);
// //     }, 100);
// //   };

// //   return (
// //     <div className="min-h-screen bg-background flex flex-col">
// //       <Header />
// //       <main className="flex-1 py-8 px-4">
// //         <div className="container mx-auto max-w-7xl">
// //           {/* Page Title */}
// //           <div className="mb-8">
// //             <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center">
// //               <Shield className="h-8 w-8 mr-3 text-red-600" />
// //               Admin Panel
// //             </h1>
// //             <p className="text-muted-foreground">
// //               Manage SOS Alert users and export data for analysis.
// //             </p>
// //           </div>

// //           {/* Stats Cards */}
// //           <div className="grid md:grid-cols-4 gap-6 mb-8">
// //             <Card>
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm text-muted-foreground mb-1">
// //                       Total Users
// //                     </p>
// //                     <p className="text-3xl font-bold text-blue-600">
// //                       {stats.totalUsers}
// //                     </p>
// //                   </div>
// //                   <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
// //                     <Users className="h-6 w-6 text-blue-600" />
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //             <Card>
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm text-muted-foreground mb-1">
// //                       Active Users
// //                     </p>
// //                     <p className="text-3xl font-bold text-green-600">
// //                       {stats.activeUsers}
// //                     </p>
// //                   </div>
// //                   <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
// //                     <BarChart3 className="h-6 w-6 text-green-600" />
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //             <Card>
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm text-muted-foreground mb-1">
// //                       Inactive Users
// //                     </p>
// //                     <p className="text-3xl font-bold text-orange-600">
// //                       {stats.inactiveUsers}
// //                     </p>
// //                   </div>
// //                   <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
// //                     <Users className="h-6 w-6 text-orange-600" />
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //             <Card>
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm text-muted-foreground mb-1">
// //                       Avg. Contacts
// //                     </p>
// //                     <p className="text-3xl font-bold text-purple-600">
// //                       {stats.avgContacts}
// //                     </p>
// //                   </div>
// //                   <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
// //                     <Phone className="h-6 w-6 text-purple-600" />
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Search and Export Controls */}
// //           <Card className="mb-8">
// //             <CardHeader>
// //               <CardTitle>User Management</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="flex flex-col md:flex-row gap-4 mb-6">
// //                 <div className="flex-1 relative">
// //                   <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                   <Input
// //                     placeholder="Search users by name or email..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     className="pl-10"
// //                   />
// //                 </div>
// //                 <div className="flex gap-2">
// //                   <Button
// //                     onClick={exportAllUsersPDF}
// //                     disabled={isLoading}
// //                     className="bg-red-600 hover:bg-red-700"
// //                   >
// //                     {isLoading ? (
// //                       "Generating..."
// //                     ) : (
// //                       <>
// //                         <FileText className="h-4 w-4 mr-2" />
// //                         Export PDF
// //                       </>
// //                     )}
// //                   </Button>
// //                   <Button onClick={exportToCSV} variant="outline">
// //                     <Download className="h-4 w-4 mr-2" />
// //                     Export CSV
// //                   </Button>
// //                 </div>
// //               </div>

// //               {/* User Table */}
// //               <div className="overflow-x-auto">
// //                 <table className="w-full border-collapse">
// //                   <thead>
// //                     <tr className="border-b border-border">
// //                       <th className="text-left p-4 font-semibold text-foreground">
// //                         Name
// //                       </th>
// //                       <th className="text-left p-4 font-semibold text-foreground">
// //                         Email
// //                       </th>
// //                       <th className="text-left p-4 font-semibold text-foreground">
// //                         Phone
// //                       </th>
// //                       <th className="text-left p-4 font-semibold text-foreground">
// //                         Join Date
// //                       </th>
// //                       <th className="text-left p-4 font-semibold text-foreground">
// //                         Status
// //                       </th>
// //                       <th className="text-left p-4 font-semibold text-foreground">
// //                         Contacts
// //                       </th>
// //                       <th className="text-left p-4 font-semibold text-foreground">
// //                         Last Active
// //                       </th>
// //                       <th className="text-left p-4 font-semibold text-foreground">
// //                         Actions
// //                       </th>
// //                       <th className="text-left p-4 font-semibold text-foreground">
// //                         Download Data
// //                       </th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {filteredUsers.map((user) => (
// //                       <tr
// //                         key={user._id}
// //                         className="border-b border-border hover:bg-muted/50"
// //                       >
// //                         <td className="p-4">
// //                           <div className="flex items-center space-x-3">
// //                             <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
// //                               <User className="h-4 w-4 text-red-600" />
// //                             </div>
// //                             <span className="font-medium text-foreground">
// //                               {user.personalInfo?.fullName || "N/A"}
// //                             </span>
// //                           </div>
// //                         </td>
// //                         <td className="p-4 text-muted-foreground">
// //                           {user.useremail}
// //                         </td>
// //                         <td className="p-4 text-muted-foreground">
// //                           {user.mobile}
// //                         </td>
// //                         <td className="p-4 text-muted-foreground">
// //                           {new Date(user.createdAt).toLocaleDateString()}
// //                         </td>
// //                         <td className="p-4">
// //                           <span
// //                             className={`px-2 py-1 rounded-full text-xs font-medium ${
// //                               user.status === "Inactive"
// //                                 ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600"
// //                                 : "bg-green-100 dark:bg-green-900/20 text-green-600"
// //                             }`}
// //                           >
// //                             {user.status || "Active"}
// //                           </span>
// //                         </td>
// //                         <td className="p-4 text-muted-foreground">
// //                           {user.emergencyContacts?.length || 0}
// //                         </td>
// //                         <td className="p-4 text-muted-foreground">
// //                           {new Date(
// //                             user.updatedAt || user.createdAt
// //                           ).toLocaleDateString()}
// //                         </td>
// //                         <td className="p-4">
// //                           <Button
// //                             size="sm"
// //                             variant="outline"
// //                             onClick={() => openUserModal(user)}
// //                           >
// //                             <Eye className="h-4 w-4 mr-1" />
// //                             View
// //                           </Button>
// //                         </td>
// //                         <td className="p-4">
// //                           <Button
// //                             onClick={() => generateUserPDF(user)}
// //                             disabled={isLoading}
// //                             className="bg-red-600 hover:bg-red-700"
// //                           >
// //                             {isLoading ? (
// //                               "Generating..."
// //                             ) : (
// //                               <>
// //                                 <FileText className="h-4 w-4 mr-2" />
// //                                 Export PDF
// //                               </>
// //                             )}
// //                           </Button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>

// //               {filteredUsers.length === 0 && (
// //                 <div className="text-center py-8 text-muted-foreground">
// //                   No users found matching your search criteria.
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>

// //           {/* System Stats */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>System Statistics</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="grid md:grid-cols-2 gap-6">
// //                 <div>
// //                   <h4 className="font-semibold text-foreground mb-3">
// //                     User Distribution
// //                   </h4>
// //                   <div className="space-y-3">
// //                     <div className="flex justify-between">
// //                       <span className="text-muted-foreground">
// //                         Active Users
// //                       </span>
// //                       <span className="font-medium text-green-600">
// //                         {stats.activeUsers}
// //                       </span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span className="text-muted-foreground">
// //                         Inactive Users
// //                       </span>
// //                       <span className="font-medium text-orange-600">
// //                         {stats.inactiveUsers}
// //                       </span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span className="text-muted-foreground">Total Users</span>
// //                       <span className="font-medium text-blue-600">
// //                         {stats.totalUsers}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <h4 className="font-semibold text-foreground mb-3">
// //                     Emergency Contacts
// //                   </h4>
// //                   <div className="space-y-3">
// //                     <div className="flex justify-between">
// //                       <span className="text-muted-foreground">
// //                         Average per User
// //                       </span>
// //                       <span className="font-medium text-purple-600">
// //                         {stats.avgContacts}
// //                       </span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span className="text-muted-foreground">
// //                         Total Contacts
// //                       </span>
// //                       <span className="font-medium text-purple-600">
// //                         {users.reduce(
// //                           (sum, u) => sum + (u.emergencyContacts?.length || 0),
// //                           0
// //                         )}
// //                       </span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span className="text-muted-foreground">
// //                         Users with 3+ Contacts
// //                       </span>
// //                       <span className="font-medium text-purple-600">
// //                         {
// //                           users.filter(
// //                             (u) => (u.emergencyContacts?.length || 0) >= 3
// //                           ).length
// //                         }
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </main>
// //       <Footer />

// //       {/* View User Modal */}
// //       {isModalOpen && selectedUser && (
// //         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto px-4 py-8">
// //           <div className="bg-white dark:bg-background p-6 rounded-lg max-w-2xl w-full shadow-lg">
// //             <h2 className="text-2xl font-bold mb-4 text-foreground">
// //               User Details
// //             </h2>

// //             {selectedUser.personalInfo?.passportPhotoUrl && (
// //               <div className="flex justify-center mb-4">
// //                 <img
// //                   src={selectedUser.personalInfo.passportPhotoUrl}
// //                   alt="Passport"
// //                   className="w-32 h-32 object-cover rounded-full border"
// //                 />
// //               </div>
// //             )}

// //             <div className="mb-4">
// //               <h3 className="font-semibold text-lg text-foreground mb-2">
// //                 Personal Info
// //               </h3>
// //               <p>
// //                 <strong>Name:</strong> {selectedUser.personalInfo?.fullName}
// //               </p>
// //               <p>
// //                 <strong>DOB:</strong> {selectedUser.personalInfo?.dob}
// //               </p>
// //               <p>
// //                 <strong>Age:</strong> {selectedUser.personalInfo?.age}
// //               </p>
// //               <p>
// //                 <strong>Blood Type:</strong>{" "}
// //                 {selectedUser.personalInfo?.bloodType}
// //               </p>
// //               <p>
// //                 <strong>Medical Conditions:</strong>{" "}
// //                 {selectedUser.personalInfo?.medicalConditions}
// //               </p>
// //               <p>
// //                 <strong>Allergies:</strong>{" "}
// //                 {selectedUser.personalInfo?.allergies}
// //               </p>
// //               <p>
// //                 <strong>Medications:</strong>{" "}
// //                 {selectedUser.personalInfo?.medications}
// //               </p>
// //               <p>
// //                 <strong>Emergency Medical Info:</strong>{" "}
// //                 {selectedUser.personalInfo?.emergencyMedicalInfo || "N/A"}
// //               </p>
// //             </div>

// //             <div className="mb-4">
// //               <h3 className="font-semibold text-lg text-foreground mb-2">
// //                 Location Info
// //               </h3>
// //               <p>
// //                 <strong>Home:</strong> {selectedUser.locationInfo?.homeAddress}
// //               </p>
// //               <p>
// //                 <strong>Work:</strong> {selectedUser.locationInfo?.workAddress}
// //               </p>
// //               <p>
// //                 <strong>Frequent Locations:</strong>{" "}
// //                 {selectedUser.locationInfo?.frequentLocations}
// //               </p>
// //             </div>

// //             <div className="mb-4">
// //               <h3 className="font-semibold text-lg text-foreground mb-2">
// //                 Emergency Contacts
// //               </h3>
// //               {selectedUser.emergencyContacts?.map((contact, index) => (
// //                 <div key={index} className="mb-2">
// //                   <p>
// //                     <strong>Name:</strong> {contact.name}
// //                   </p>
// //                   <p>
// //                     <strong>Relation:</strong> {contact.relation}
// //                   </p>
// //                   <p>
// //                     <strong>Phone:</strong> {contact.phone}
// //                   </p>
// //                   <p>
// //                     <strong>Email:</strong> {contact.email}
// //                   </p>
// //                   <p>
// //                     <strong>Primary:</strong> {contact.isPrimary ? "Yes" : "No"}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="flex justify-end">
// //               <Button
// //                 onClick={closeUserModal}
// //                 className="bg-red-600 text-white hover:bg-red-700"
// //               >
// //                 Close
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminPanel;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import {
//   Shield,
//   Users,
//   Download,
//   Eye,
//   Search,
//   FileText,
//   BarChart3,
//   User,
//   Phone,
// } from "lucide-react";
// import { Button } from "@/components/ui/button.jsx";
// import { Input } from "@/components/ui/input.jsx";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card.jsx";
// import { useToast } from "@/hooks/use-toast.js";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { API_BASE_URL } from "../config";

// const AdminPanel = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { toast } = useToast();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/api/auth/allSosDetails`);
//         setUsers(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch users", err);
//       }
//     };
//     fetchUsers();
//   }, []);


// const exportToCSV = () => {
//   const csvContent = [
//     [
//       "Name",
//       "Email",
//       "Phone",
     
//       "DOB",
//       "Blood Type",
//       "Home Address",
//       "Emergency Contacts",
//       "Last Active",
//     ],
//     ...filteredUsers.map((user) => {
//       const emergencyContactsString = (user.emergencyContacts || [])
//         .map((contact, idx) => {
//           return `${idx + 1}). Name:  ${contact.name}, Contact Email: ${contact.email}`;
//         })
//         .join(" | ");

//       return [
//         user.personalInfo?.fullName || "N/A",
//         user.useremail || "N/A",
//         user.mobile || "N/A",
       
//         user.personalInfo?.dob || "N/A",
//         user.personalInfo?.bloodType || "N/A",
//         user.locationInfo?.homeAddress || "N/A",
//         emergencyContactsString || "None",
//         new Date(user.updatedAt || user.createdAt).toLocaleDateString(),
//       ];
//     }),
//   ]
//     .map((row) =>
//       row
//         .map((value) => `"${String(value).replace(/"/g, '""')}"`) // Handle commas and quotes
//         .join(",")
//     )
//     .join("\n");

//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "sos_users_data.csv";
//   a.click();
//   window.URL.revokeObjectURL(url);

//   toast({
//     title: "CSV Export Successful",
//     description: "User data has been exported to CSV successfully!",
//   });
// };


//   const openUserModal = (user) => {
//     setSelectedUser(user);
//     setIsModalOpen(true);
//   };

//   const closeUserModal = () => {
//     setSelectedUser(null);
//     setIsModalOpen(false);
//   };

//   const stats = {
//     totalUsers: users.length,
//     activeUsers: users.filter((u) => u.status !== "Inactive").length,
//     inactiveUsers: users.filter((u) => u.status === "Inactive").length,
//     avgContacts:
//       users.length > 0
//         ? Math.round(
//             users.reduce(
//               (sum, u) => sum + (u.emergencyContacts?.length || 0),
//               0
//             ) / users.length
//           )
//         : 0,
//   };
//   const [loadingPDF, setLoadingPDF] = useState(false);

//   const filteredUsers = users.filter(
//     (user) =>
//       user.personalInfo?.fullName
//         ?.toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       user.useremail?.toLowerCase().includes(searchTerm.toLowerCase())
//   );


// const exportAllUsersPDF = async (filteredUsers, setIsLoading) => {
//   setIsLoading(true);

//   const doc = new jsPDF();
//   const pageHeight = doc.internal.pageSize.height;

//   doc.setFontSize(16);
//   doc.text("SOS Full User Details", 14, 15);
//   let y = 25;

//   // Helper function to convert image URL to Base64
//   const getImageDataUrl = (url) => {
//     return new Promise((resolve, reject) => {
//       const img = new window.Image();
//       img.setAttribute("crossOrigin", "anonymous");
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         canvas.getContext("2d").drawImage(img, 0, 0);
//         resolve(canvas.toDataURL("image/jpeg"));
//       };
//       img.onerror = reject;
//       img.src = url;
//     });
//   };

//   for (let index = 0; index < filteredUsers.length; index++) {
//     const user = filteredUsers[index];

//     if (index !== 0) y += 10;
//     doc.setFontSize(12);
//     doc.text(`User #${index + 1}`, 14, y);
//     y += 6;

    
//     // Passport Photo (right-aligned)
//     if (user.personalInfo?.passportPhotoUrl) {
//       try {
//         const imageDataUrl = await getImageDataUrl(user.personalInfo.passportPhotoUrl);
//         doc.addImage(imageDataUrl, "JPEG", 150, y - 10, 40, 40);
//       } catch (err) {
//         console.warn("Image failed to load:", err);
//       }
//     }

//     // Section: Personal Info
//     doc.setFontSize(12);
//     doc.text("Personal Info", 14, y);
//     y += 8;

//     const personalFields = [
//       `Name: ${user.personalInfo?.fullName ?? ""}`,
//       `DOB: ${user.personalInfo?.dob ?? ""}`,
//       `Email: ${user.useremail ?? ""}`,
//       `Phone: ${user.mobile ?? ""}`,
//       `Blood Type: ${user.personalInfo?.bloodType ?? ""}`,
//     ];

//     for (const line of personalFields) {
//       const wrapped = doc.splitTextToSize(line, 180);
//       if (y + wrapped.length * 6 > pageHeight) {
//         doc.addPage();
//         y = 15;
//       }
//       doc.text(wrapped, 14, y);
//       y += wrapped.length * 6;
//     }

//     // Section: Location Info
//     if (y + 20 > pageHeight) {
//       doc.addPage();
//       y = 15;
//     }
//     doc.text("Location Info", 14, y);
//     y += 8;

//     const homeAddress = user.locationInfo?.homeAddress ?? "";
//     const wrappedAddress = doc.splitTextToSize(`Home: ${homeAddress}`, 180);
//     doc.text(wrappedAddress, 14, y);
//     y += wrappedAddress.length * 6;

//     // Section: Emergency Contacts
//     if (y + 20 > pageHeight) {
//       doc.addPage();
//       y = 15;
//     }
//     doc.text("Emergency Contacts", 14, y);
//     y += 8;

//     user.emergencyContacts?.forEach((contact, idx) => {
//       const contactLine = `${idx + 1}. ${contact.name} - ${contact.email}`;
//       const wrappedContact = doc.splitTextToSize(contactLine, 180);
//       if (y + wrappedContact.length * 6 > pageHeight) {
//         doc.addPage();
//         y = 15;
//       }
//       doc.text(wrappedContact, 14, y);
//       y += wrappedContact.length * 6;
//     });

//     if (y > pageHeight - 20) {
//       doc.addPage();
//       y = 15;
//     }
//   }

//   doc.save("sos_full_users_report.pdf");
//   toast({
//     title: "PDF Export Successful",
//     description: "All user details have been exported!",
//   });
//   setIsLoading(false);
// };


// const generateUserPDF = async (user, setLoadingPDF) => {
//   try {
//     setLoadingPDF(true);

//     const doc = new jsPDF();
//     const pageHeight = doc.internal.pageSize.height;
//     let y = 15;

//     // Helper to load image as base64
//     const getImageDataUrl = (url) => {
//       return new Promise((resolve, reject) => {
//         const img = new window.Image();
//         img.setAttribute("crossOrigin", "anonymous");
//         img.onload = () => {
//           const canvas = document.createElement("canvas");
//           canvas.width = img.width;
//           canvas.height = img.height;
//           canvas.getContext("2d").drawImage(img, 0, 0);
//           resolve(canvas.toDataURL("image/jpeg"));
//         };
//         img.onerror = reject;
//         img.src = url;
//       });
//     };

//     // Title
//     doc.setFontSize(16);
//     doc.text(`SOS User Report - ${user.personalInfo?.fullName ?? ""}`, 14, y);
//     y += 10;

//     // Passport Photo (right-aligned)
//     if (user.personalInfo?.passportPhotoUrl) {
//       try {
//         const imageDataUrl = await getImageDataUrl(user.personalInfo.passportPhotoUrl);
//         doc.addImage(imageDataUrl, "JPEG", 150, y - 10, 40, 40);
//       } catch (err) {
//         console.warn("Image failed to load");
//       }
//     }

//     // Section: Personal Info
//     doc.setFontSize(12);
//     doc.text("Personal Info", 14, y);
//     y += 8;

//     const personalFields = [
//       `Name: ${user.personalInfo?.fullName ?? ""}`,
//       `DOB: ${user.personalInfo?.dob ?? ""}`,
//       `Email: ${user.useremail ?? ""}`,
//       `Phone: ${user.mobile ?? ""}`,
//       `Blood Type: ${user.personalInfo?.bloodType ?? ""}`,
//     ];

//     for (const line of personalFields) {
//       const wrapped = doc.splitTextToSize(line, 180);
//       if (y + wrapped.length * 6 > pageHeight) {
//         doc.addPage();
//         y = 15;
//       }
//       doc.text(wrapped, 14, y);
//       y += wrapped.length * 6;
//     }

//     // Section: Location Info
//     if (y + 20 > pageHeight) {
//       doc.addPage();
//       y = 15;
//     }
//     doc.text("Location Info", 14, y);
//     y += 8;

//     const homeAddress = user.locationInfo?.homeAddress ?? "";
//     const wrappedAddress = doc.splitTextToSize(`Home: ${homeAddress}`, 180);
//     doc.text(wrappedAddress, 14, y);
//     y += wrappedAddress.length * 6;

//     // Section: Emergency Contacts
//     if (y + 20 > pageHeight) {
//       doc.addPage();
//       y = 15;
//     }
//     doc.text("Emergency Contacts", 14, y);
//     y += 8;

//     user.emergencyContacts?.forEach((contact, index) => {
//       const contactLine = `${index + 1}. ${contact.name} - ${contact.email}`;
//       const wrappedContact = doc.splitTextToSize(contactLine, 180);
//       if (y + wrappedContact.length * 6 > pageHeight) {
//         doc.addPage();
//         y = 15;
//       }
//       doc.text(wrappedContact, 14, y);
//       y += wrappedContact.length * 6;
//     });

//     doc.save(`${user.personalInfo?.fullName ?? "sos"}_sos_report.pdf`);
//   } catch (e) {
//     console.error("Error generating PDF:", e);
//   } finally {
//     setLoadingPDF(false);
//   }
// };


//   return (
//     <div className="min-h-screen bg-background flex flex-col">
//       <Header />
//       <main className="flex-1 py-8 px-4">
//         <div className="container mx-auto max-w-7xl">
//           {/* Page Title */}
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center">
//               <Shield className="h-8 w-8 mr-3 text-red-600" />
//               Admin Panel
//             </h1>
//             <p className="text-muted-foreground">
//               Manage SOS Alert users and export data for analysis.
//             </p>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid md:grid-cols-4 gap-6 mb-8">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-1">
//                       Total Users
//                     </p>
//                     <p className="text-3xl font-bold text-blue-600">
//                       {stats.totalUsers}
//                     </p>
//                   </div>
//                   <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
//                     <Users className="h-6 w-6 text-blue-600" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-1">
//                       Active Users
//                     </p>
//                     <p className="text-3xl font-bold text-green-600">
//                       {stats.activeUsers}
//                     </p>
//                   </div>
//                   <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
//                     <BarChart3 className="h-6 w-6 text-green-600" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-1">
//                       Inactive Users
//                     </p>
//                     <p className="text-3xl font-bold text-orange-600">
//                       {stats.inactiveUsers}
//                     </p>
//                   </div>
//                   <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
//                     <Users className="h-6 w-6 text-orange-600" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-1">
//                       Avg. Contacts
//                     </p>
//                     <p className="text-3xl font-bold text-purple-600">
//                       {stats.avgContacts}
//                     </p>
//                   </div>
//                   <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
//                     <Phone className="h-6 w-6 text-purple-600" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Search and Export Controls */}
//           <Card className="mb-8">
//             <CardHeader>
//               <CardTitle>User Management</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col md:flex-row gap-4 mb-6">
//                 <div className="flex-1 relative">
//                   <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     placeholder="Search users by name or email..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   <Button
//                     onClick={() => exportAllUsersPDF(filteredUsers, setIsLoading)}
//                     disabled={isLoading}
//                     className="bg-red-600 hover:bg-red-700"
//                   >
//                     {isLoading ? (
//                       "Generating..."
//                     ) : (
//                       <>
//                         <FileText className="h-4 w-4 mr-2" />
//                         Export PDF
//                       </>
//                     )}
//                   </Button>
//                   <Button onClick={exportToCSV} variant="outline">
//                     <Download className="h-4 w-4 mr-2" />
//                     Export CSV
//                   </Button>
//                 </div>
//               </div>

//               {/* User Table */}
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                   <thead>
//                     <tr className="border-b border-border">
//                       <th className="text-left p-4 font-semibold text-foreground">
//                         Name
//                       </th>
//                       <th className="text-left p-4 font-semibold text-foreground">
//                         Email
//                       </th>
//                       <th className="text-left p-4 font-semibold text-foreground">
//                         Phone
//                       </th>
//                       <th className="text-left p-4 font-semibold text-foreground">
//                         Join Date
//                       </th>
//                       <th className="text-left p-4 font-semibold text-foreground">
//                         Status
//                       </th>
//                       <th className="text-left p-4 font-semibold text-foreground">
//                         Contacts
//                       </th>
//                       <th className="text-left p-4 font-semibold text-foreground">
//                         Last Active
//                       </th>
//                       <th className="text-left p-4 font-semibold text-foreground">
//                         Actions
//                       </th>
//                       <th className="text-left p-4 font-semibold text-foreground">
//                         Download Data
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredUsers.map((user) => (
//                       <tr
//                         key={user._id}
//                         className="border-b border-border hover:bg-muted/50"
//                       >
//                         <td className="p-4">
//                           <div className="flex items-center space-x-3">
//                             <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
//                               <User className="h-4 w-4 text-red-600" />
//                             </div>
//                             <span className="font-medium text-foreground">
//                               {user.personalInfo?.fullName || "N/A"}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="p-4 text-muted-foreground">
//                           {user.useremail}
//                         </td>
//                         <td className="p-4 text-muted-foreground">
//                           {user.mobile}
//                         </td>
//                         <td className="p-4 text-muted-foreground">
//                           {new Date(user.createdAt).toLocaleDateString()}
//                         </td>
//                         <td className="p-4">
//                           <span
//                             className={`px-2 py-1 rounded-full text-xs font-medium ${
//                               user.status === "Inactive"
//                                 ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600"
//                                 : "bg-green-100 dark:bg-green-900/20 text-green-600"
//                             }`}
//                           >
//                             {user.status || "Active"}
//                           </span>
//                         </td>
//                         <td className="p-4 text-muted-foreground">
//                           {user.emergencyContacts?.length || 0}
//                         </td>
//                         <td className="p-4 text-muted-foreground">
//                           {new Date(
//                             user.updatedAt || user.createdAt
//                           ).toLocaleDateString()}
//                         </td>
//                         <td className="p-4">
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() => openUserModal(user)}
//                           >
//                             <Eye className="h-4 w-4 mr-1" />
//                             View
//                           </Button>
//                         </td>
//                         <td className="p-4">
//                           <Button
//                             onClick={() => generateUserPDF(user, setLoadingPDF)}
//                             disabled={isLoading}
//                             className="bg-red-600 hover:bg-red-700"
//                           >
//                             {isLoading ? (
//                               "Generating..."
//                             ) : (
//                               <>
//                                 <FileText className="h-4 w-4 mr-2" />
//                                 Export PDF
//                               </>
//                             )}
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {filteredUsers.length === 0 && (
//                 <div className="text-center py-8 text-muted-foreground">
//                   No users found matching your search criteria.
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* System Stats */}
//           <Card>
//             <CardHeader>
//               <CardTitle>System Statistics</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-semibold text-foreground mb-3">
//                     User Distribution
//                   </h4>
//                   <div className="space-y-3">
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">
//                         Active Users
//                       </span>
//                       <span className="font-medium text-green-600">
//                         {stats.activeUsers}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">
//                         Inactive Users
//                       </span>
//                       <span className="font-medium text-orange-600">
//                         {stats.inactiveUsers}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Total Users</span>
//                       <span className="font-medium text-blue-600">
//                         {stats.totalUsers}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-foreground mb-3">
//                     Emergency Contacts
//                   </h4>
//                   <div className="space-y-3">
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">
//                         Average per User
//                       </span>
//                       <span className="font-medium text-purple-600">
//                         {stats.avgContacts}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">
//                         Total Contacts
//                       </span>
//                       <span className="font-medium text-purple-600">
//                         {users.reduce(
//                           (sum, u) => sum + (u.emergencyContacts?.length || 0),
//                           0
//                         )}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">
//                         Users with 3+ Contacts
//                       </span>
//                       <span className="font-medium text-purple-600">
//                         {
//                           users.filter(
//                             (u) => (u.emergencyContacts?.length || 0) >= 3
//                           ).length
//                         }
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//       <Footer />

//       {/* View User Modal */}
//       {isModalOpen && selectedUser && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto px-4 py-8">
//           <div className="bg-white dark:bg-background p-6 rounded-lg max-w-2xl w-full shadow-lg">
//             <h2 className="text-2xl font-bold mb-4 text-foreground">
//               User Details
//             </h2>

//             {selectedUser.personalInfo?.passportPhotoUrl && (
//               <div className="flex justify-center mb-4">
//                 <img
//                   src={selectedUser.personalInfo.passportPhotoUrl}
//                   alt="Passport"
//                   className="w-32 h-32 object-cover rounded-full border"
//                 />
//               </div>
//             )}

//             <div className="mb-4">
//               <h3 className="font-semibold text-lg text-foreground mb-2">
//                 Personal Info
//               </h3>
//               <p>
//                 <strong>Name:</strong> {selectedUser.personalInfo?.fullName}
//               </p>
//               <p>
//                 <strong>DOB:</strong> {selectedUser.personalInfo?.dob}
//               </p>

//               <p>
//                 <strong>Blood Type:</strong>{" "}
//                 {selectedUser.personalInfo?.bloodType}
//               </p>
//             </div>

//             <div className="mb-4">
//               <h3 className="font-semibold text-lg text-foreground mb-2">
//                 Location Info
//               </h3>
//               <p>
//                 <strong>Home:</strong> {selectedUser.locationInfo?.homeAddress}
//               </p>
//             </div>

//             <div className="mb-4">
//               <h3 className="font-semibold text-lg text-foreground mb-2">
//                 Emergency Contacts
//               </h3>
//               {selectedUser.emergencyContacts?.map((contact, index) => (
//                 <div key={index} className="mb-2">
//                   <p>
//                     <strong>Name:</strong> {contact.name}
//                   </p>

//                   <p>
//                     <strong>Email:</strong> {contact.email}
//                   </p>
//                   <p>
//                     <strong>Primary:</strong> {contact.isPrimary ? "Yes" : "No"}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-end">
//               <Button
//                 onClick={closeUserModal}
//                 className="bg-red-600 text-white hover:bg-red-700"
//               >
//                 Close
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPanel;
import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  Shield,
  Users,
  Download,
  Eye,
  Search,
  FileText,
  BarChart3,
  User,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { useToast } from "@/hooks/use-toast.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_BASE_URL } from "../config";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/auth/allSosDetails`);
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  const exportToCSV = () => {
    const csvContent = [
      [
        "Name",
        "Email",
        "Phone",
        "DOB",
        "Blood Type",
        "Home Address",
        "Emergency Contacts",
        "Last Active",
      ],
      ...filteredUsers.map((user) => {
        const emergencyContactsString = (user.emergencyContacts || [])
          .map((contact, idx) => {
            return `${idx + 1}). Name:  ${contact.name}, Contact Email: ${contact.email}`;
          })
          .join(" | ");

        return [
          user.personalInfo?.fullName || "N/A",
          user.useremail || "N/A",
          user.mobile || "N/A",
          user.personalInfo?.dob || "N/A",
          user.personalInfo?.bloodType || "N/A",
          user.locationInfo?.homeAddress || "N/A",
          emergencyContactsString || "None",
          new Date(user.updatedAt || user.createdAt).toLocaleDateString(),
        ];
      }),
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sos_users_data.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "CSV Export Successful",
      description: "User data has been exported to CSV successfully!",
    });
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeUserModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status !== "Inactive").length,
    inactiveUsers: users.filter((u) => u.status === "Inactive").length,
    avgContacts:
      users.length > 0
        ? Math.round(
            users.reduce(
              (sum, u) => sum + (u.emergencyContacts?.length || 0),
              0
            ) / users.length
          )
        : 0,
  };
  const [loadingPDF, setLoadingPDF] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.personalInfo?.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.useremail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportAllUsersPDF = async (filteredUsers, setIsLoading) => {
    setIsLoading(true);

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(16);
    doc.text("SOS Full User Details", 14, 15);
    let y = 25;

    const getImageDataUrl = (url) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.setAttribute("crossOrigin", "anonymous");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext("2d").drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/jpeg"));
        };
        img.onerror = reject;
        img.src = url;
      });
    };

    for (let index = 0; index < filteredUsers.length; index++) {
      const user = filteredUsers[index];

      if (index !== 0) y += 10;
      doc.setFontSize(12);
      doc.text(`User #${index + 1}`, 14, y);
      y += 6;

      if (user.personalInfo?.passportPhotoUrl) {
        try {
          const imageDataUrl = await getImageDataUrl(user.personalInfo.passportPhotoUrl);
          doc.addImage(imageDataUrl, "JPEG", 150, y - 10, 40, 40);
        } catch (err) {
          console.warn("Image failed to load:", err);
        }
      }

      doc.setFontSize(12);
      doc.text("Personal Info", 14, y);
      y += 8;

      const personalFields = [
        `Name: ${user.personalInfo?.fullName ?? ""}`,
        `DOB: ${user.personalInfo?.dob ?? ""}`,
        `Email: ${user.useremail ?? ""}`,
        `Phone: ${user.mobile ?? ""}`,
        `Blood Type: ${user.personalInfo?.bloodType ?? ""}`,
      ];

      for (const line of personalFields) {
        const wrapped = doc.splitTextToSize(line, 180);
        if (y + wrapped.length * 6 > pageHeight) {
          doc.addPage();
          y = 15;
        }
        doc.text(wrapped, 14, y);
        y += wrapped.length * 6;
      }

      if (y + 20 > pageHeight) {
        doc.addPage();
        y = 15;
      }
      doc.text("Location Info", 14, y);
      y += 8;

      const homeAddress = user.locationInfo?.homeAddress ?? "";
      const wrappedAddress = doc.splitTextToSize(`Home: ${homeAddress}`, 180);
      doc.text(wrappedAddress, 14, y);
      y += wrappedAddress.length * 6;

      if (y + 20 > pageHeight) {
        doc.addPage();
        y = 15;
      }
      doc.text("Emergency Contacts", 14, y);
      y += 8;

      user.emergencyContacts?.forEach((contact, idx) => {
        const contactLine = `${idx + 1}. ${contact.name} - ${contact.email}`;
        const wrappedContact = doc.splitTextToSize(contactLine, 180);
        if (y + wrappedContact.length * 6 > pageHeight) {
          doc.addPage();
          y = 15;
        }
        doc.text(wrappedContact, 14, y);
        y += wrappedContact.length * 6;
      });

      if (y > pageHeight - 20) {
        doc.addPage();
        y = 15;
      }
    }

    doc.save("sos_full_users_report.pdf");
    toast({
      title: "PDF Export Successful",
      description: "All user details have been exported!",
    });
    setIsLoading(false);
  };

  const generateUserPDF = async (user, setLoadingPDF) => {
    try {
      setLoadingPDF(true);

      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.height;
      let y = 15;

      const getImageDataUrl = (url) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.setAttribute("crossOrigin", "anonymous");
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext("2d").drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/jpeg"));
          };
          img.onerror = reject;
          img.src = url;
        });
      };

      doc.setFontSize(16);
      doc.text(`SOS User Report - ${user.personalInfo?.fullName ?? ""}`, 14, y);
      y += 10;

      if (user.personalInfo?.passportPhotoUrl) {
        try {
          const imageDataUrl = await getImageDataUrl(user.personalInfo.passportPhotoUrl);
          doc.addImage(imageDataUrl, "JPEG", 150, y - 10, 40, 40);
        } catch (err) {
          console.warn("Image failed to load");
        }
      }

      doc.setFontSize(12);
      doc.text("Personal Info", 14, y);
      y += 8;

      const personalFields = [
        `Name: ${user.personalInfo?.fullName ?? ""}`,
        `DOB: ${user.personalInfo?.dob ?? ""}`,
        `Email: ${user.useremail ?? ""}`,
        `Phone: ${user.mobile ?? ""}`,
        `Blood Type: ${user.personalInfo?.bloodType ?? ""}`,
      ];

      for (const line of personalFields) {
        const wrapped = doc.splitTextToSize(line, 180);
        if (y + wrapped.length * 6 > pageHeight) {
          doc.addPage();
          y = 15;
        }
        doc.text(wrapped, 14, y);
        y += wrapped.length * 6;
      }

      if (y + 20 > pageHeight) {
        doc.addPage();
        y = 15;
      }
      doc.text("Location Info", 14, y);
      y += 8;

      const homeAddress = user.locationInfo?.homeAddress ?? "";
      const wrappedAddress = doc.splitTextToSize(`Home: ${homeAddress}`, 180);
      doc.text(wrappedAddress, 14, y);
      y += wrappedAddress.length * 6;

      if (y + 20 > pageHeight) {
        doc.addPage();
        y = 15;
      }
      doc.text("Emergency Contacts", 14, y);
      y += 8;

      user.emergencyContacts?.forEach((contact, index) => {
        const contactLine = `${index + 1}. ${contact.name} - ${contact.email}`;
        const wrappedContact = doc.splitTextToSize(contactLine, 180);
        if (y + wrappedContact.length * 6 > pageHeight) {
          doc.addPage();
          y = 15;
        }
        doc.text(wrappedContact, 14, y);
        y += wrappedContact.length * 6;
      });

      doc.save(`${user.personalInfo?.fullName ?? "sos"}_sos_report.pdf`);
    } catch (e) {
      console.error("Error generating PDF:", e);
    } finally {
      setLoadingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-2 sm:px-4">{/* responsive change: px-2 for mobile, px-4 for sm+ */}
        <div className="container mx-auto max-w-full md:max-w-7xl">{/* responsive change: full width on small screens */}
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 flex flex-col sm:flex-row items-start sm:items-center">
              {/* responsive change: flex-col for mobile, flex-row for larger screens */}
              <Shield className="h-8 w-8 mr-0 mb-2 sm:mb-0 sm:mr-3 text-red-600" />
              Admin Panel
            </h1>
            <p className="text-muted-foreground">
              Manage SOS Alert users and export data for analysis.
            </p>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">{/* responsive change: 1 column mobile, 2 on sm, 4 on md+ */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Users</p>
                    <p className="text-3xl font-bold text-green-600">{stats.activeUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Inactive Users</p>
                    <p className="text-3xl font-bold text-orange-600">{stats.inactiveUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Avg. Contacts</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.avgContacts}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Search and Export Controls */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 mb-6"> {/* responsive change: make column on mobile, row on sm+ */}
                 <div className="flex-1 relative order-2 sm:order-1">        {/* responsive change: move search below buttons on mobile */}
                   <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                   <Input
                     placeholder="Search users by name or email..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="pl-10"
                   />
                 </div>
                 <div className="flex flex-col sm:flex-row gap-2 flex-none order-1 sm:order-2 w-full sm:w-auto"> {/* responsive change: buttons in column on mobile */}
                   <Button
                     onClick={() => exportAllUsersPDF(filteredUsers, setIsLoading)}
                     disabled={isLoading}
                     className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"              // responsive change: w-full on mobile
                   >
                     {isLoading ? (
                       "Generating..."
                     ) : (
                       <>
                         <FileText className="h-4 w-4 mr-2" />
                         Export PDF
                       </>
                     )}
                   </Button>
                   <Button
                     onClick={exportToCSV}
                     variant="outline"
                     className="w-full sm:w-auto"                                          // responsive change: w-full on mobile
                   >
                     <Download className="h-4 w-4 mr-2" />
                     Export CSV
                   </Button>
                 </div>
               </div>

              {/* User Table */}
              <div className="w-full overflow-x-auto">{/* responsive change: keep overflow for small screens */}
                <table className="w-full border-collapse min-w-[600px]">{/* responsive change: ensure min-width */}
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 sm:p-4 font-semibold text-foreground">Name</th>
                      <th className="text-left p-2 sm:p-4 font-semibold text-foreground">Email</th>
                      <th className="text-left p-2 sm:p-4 font-semibold text-foreground">Phone</th>
                      <th className="text-left p-2 sm:p-4 font-semibold text-foreground">Join Date</th>
                      <th className="text-left p-2 sm:p-4 font-semibold text-foreground">Status</th>
                      <th className="text-left p-2 sm:p-4 font-semibold text-foreground">Contacts</th>
                      <th className="text-left p-2 sm:p-4 font-semibold text-foreground">Last Active</th>
                      <th className="text-left p-2 sm:p-4 font-semibold text-foreground">Actions</th>
                      <th className="text-left p-2 sm:p-4 font-semibold text-foreground">Download Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-border hover:bg-muted/50"
                      >
                        <td className="p-2 sm:p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-red-600" />
                            </div>
                            <span className="font-medium text-foreground">
                              {user.personalInfo?.fullName || "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="p-2 sm:p-4 text-muted-foreground">
                          {user.useremail}
                        </td>
                        <td className="p-2 sm:p-4 text-muted-foreground">
                          {user.mobile}
                        </td>
                        <td className="p-2 sm:p-4 text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-2 sm:p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === "Inactive"
                                ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600"
                                : "bg-green-100 dark:bg-green-900/20 text-green-600"
                            }`}
                          >
                            {user.status || "Active"}
                          </span>
                        </td>
                        <td className="p-2 sm:p-4 text-muted-foreground">
                          {user.emergencyContacts?.length || 0}
                        </td>
                        <td className="p-2 sm:p-4 text-muted-foreground">
                          {new Date(
                            user.updatedAt || user.createdAt
                          ).toLocaleDateString()}
                        </td>
                        <td className="p-2 sm:p-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openUserModal(user)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </td>
                        <td className="p-2 sm:p-4">
                          <Button
                            onClick={() => generateUserPDF(user, setLoadingPDF)}
                            disabled={isLoading}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {isLoading ? (
                              "Generating..."
                            ) : (
                              <>
                                <FileText className="h-4 w-4 mr-2" />
                                Export PDF
                              </>
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No users found matching your search criteria.
                </div>
              )}
            </CardContent>
          </Card>
          {/* System Stats */}
          <Card>
            <CardHeader>
              <CardTitle>System Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{/* responsive change: 1 column on mobile, 2 cols on md+ */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    User Distribution
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Active Users
                      </span>
                      <span className="font-medium text-green-600">
                        {stats.activeUsers}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Inactive Users
                      </span>
                      <span className="font-medium text-orange-600">
                        {stats.inactiveUsers}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Users</span>
                      <span className="font-medium text-blue-600">
                        {stats.totalUsers}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Emergency Contacts
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Average per User
                      </span>
                      <span className="font-medium text-purple-600">
                        {stats.avgContacts}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Contacts
                      </span>
                      <span className="font-medium text-purple-600">
                        {users.reduce(
                          (sum, u) => sum + (u.emergencyContacts?.length || 0),
                          0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Users with 3+ Contacts
                      </span>
                      <span className="font-medium text-purple-600">
                        {
                          users.filter(
                            (u) => (u.emergencyContacts?.length || 0) >= 3
                          ).length
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto px-2 sm:px-4 py-8">
          {/* responsive change: px-2 mobile, px-4 sm+ */}
          <div className="bg-white dark:bg-background p-4 sm:p-6 rounded-lg max-w-full sm:max-w-2xl w-full shadow-lg">
            {/* responsive change: p-4 mobile, p-6 on sm+, max-w-full for mobile */}
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">{/* responsive change: text-xl mobile, text-2xl on sm+ */}
              User Details
            </h2>
            {selectedUser.personalInfo?.passportPhotoUrl && (
              <div className="flex justify-center mb-4">
                <img
                  src={selectedUser.personalInfo.passportPhotoUrl}
                  alt="Passport"
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border"
                  // responsive change: w-24 h-24 on mobile, w-32 h-32 on sm+
                />
              </div>
            )}
            <div className="mb-4">
              <h3 className="font-semibold text-base sm:text-lg text-foreground mb-2">
                {/* responsive change: text-base mobile, text-lg on sm+ */}
                Personal Info
              </h3>
              <p>
                <strong>Name:</strong> {selectedUser.personalInfo?.fullName}
              </p>
              <p>
                <strong>DOB:</strong> {selectedUser.personalInfo?.dob}
              </p>
              <p>
                <strong>Blood Type:</strong>{" "}
                {selectedUser.personalInfo?.bloodType}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-base sm:text-lg text-foreground mb-2">
                Location Info
              </h3>
              <p>
                <strong>Home:</strong> {selectedUser.locationInfo?.homeAddress}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-base sm:text-lg text-foreground mb-2">
                Emergency Contacts
              </h3>
              {selectedUser.emergencyContacts?.map((contact, index) => (
                <div key={index} className="mb-2">
                  <p>
                    <strong>Name:</strong> {contact.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {contact.email}
                  </p>
                  <p>
                    <strong>Primary:</strong> {contact.isPrimary ? "Yes" : "No"}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                onClick={closeUserModal}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
