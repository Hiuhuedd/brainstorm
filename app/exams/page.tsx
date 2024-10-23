"use client";
import React, { useState, useEffect } from 'react';
import Tasks from '../Components/Tasks/Tasks';
import { PRODUCTION_URL } from "../utils/urls"; // Import URLs

export default function Home() {

  interface Task {
    fileURI: string;
    programCode: string;
    isCommonUnit: boolean;
    unitCode: string;
    unitName: string;
    semester: number;
    year: number;
    resourceDate: Date;
    isProfessorEndorsed: boolean;
    isExam: boolean;
    isNotes: boolean;
    unitProfessor: string;
  }
  
  const [resources, setResources] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`${PRODUCTION_URL}/resources`, {
          method: "GET", // Specify the method as GET
          headers: {
            "Content-Type": "application/json", // Set the content type
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || "Failed to fetch resources");
        }

        const data = await response.json();
        
        // Filter resources to include only those with isExam as true
        const examResources = data.filter((resource: Task) => resource.isExam);

        setResources(examResources); // Set filtered resources in state
      } catch (error: any) {
        setError("Couldn't fetch resources. Please try again later."); // Handle errors
        console.error("Error fetching resources:", error.message); // Log error for debugging
      } finally {
        setLoading(false); // Set loading to false after fetch is done
      }
    };

    fetchResources(); // Call the function to fetch resources when the component mounts
  }, []);

  // Conditional rendering based on loading and error states
  if (loading) {
    return <p>Loading...</p>; // Display loading text
  }

  if (error) {
    return <p>{error}</p>; // Display the error message
  }

  return (
    <div>
      {/* Render the Tasks component only when data is fetched */}
      <Tasks title="Exams" resources={resources} />
    </div>
  );
}
