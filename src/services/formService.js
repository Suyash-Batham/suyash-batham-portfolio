import { collection, addDoc, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

// Add a new form submission
export const submitContactForm = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, "contactSubmissions"), {
      ...formData,
      submittedAt: new Date().toISOString(),
      createdAt: new Date()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get all form submissions (admin only)
export const getContactSubmissions = async () => {
  try {
    const q = query(collection(db, "contactSubmissions"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const submissions = [];
    
    querySnapshot.forEach((doc) => {
      submissions.push({ id: doc.id, ...doc.data() });
    });
    
    return submissions;
  } catch (error) {
    return [];
  }
};

// Delete a submission
export const deleteSubmission = async (submissionId) => {
  try {
    await deleteDoc(doc(db, "contactSubmissions", submissionId));
    console.log("Submission deleted:", submissionId);
    return true;
  } catch (error) {
    console.error("Error deleting submission:", error);
    return false;
  }
};
