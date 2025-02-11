import React from "react";
import { useSelector } from 'react-redux';
// import Navbar from "../components/Navbar.js";
// import Footer from "../components/Footer.js";


export default function TProfile() {
  const { currentUser, response, error } = useSelector((state) => state.user);
  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass;
const studentSchool = currentUser.school;  // Assuming it's stored as a Date
const gender = currentUser.gender;
const contact = currentUser.contact;
const email = currentUser.email;
const name = currentUser.name;
const Address = currentUser.Address;

const qualification = currentUser.qualification;

const role = currentUser.role;

const experience = currentUser.experience;
const teachSubject = currentUser.teachSubject;
const school = currentUser.school;
const teacherId = currentUser.teacherId;




// const getTeacherDetails = async (req, res) => {
//   try {
//       const teacher = await teacher.findById(req.params.id)
//           .populate('teachSubject', 'subject') // Populate Subject Name
//           .populate('teachSclass', 'sclass'); // Populate Class Name
      
//       if (!teacher) {
//           return res.status(404).json({ message: "Teacher not found" });
//       }

//       res.json(teacher);
//   } catch (error) {
//       res.status(500).json({ message: "Server error", error });
//   }
// };


  return (
    <>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section><section className="relative py-16 bg-gray-300">
  <div className="container mx-auto px-4">
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
      <div className="px-6">
        <div className="text-center mt-12">
          <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800">
            {currentUser.name}
          </h3>
        </div>

        {/* Card Table */}
        <div className="overflow-x-auto">
          <div className="bg-white shadow-lg rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-6 py-3 text-left">Details</th>
                  <th className="px-6 py-3 text-left">Information</th>
                </tr>
              </thead>
              <tbody>

              

                <tr className="border-b">
                  <td className="px-6 py-4 text-gray-600 font-semibold">
                    <div className="flex items-center">
                      Role/Possition:
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{currentUser.role}</td>
                </tr>

                {/* Class Name */}
                <tr className="border-b">
                  <td className="px-6 py-4 text-gray-600 font-semibold">Class:</td>
                  <td className="px-6 py-4 text-gray-500">{teachSclass?.sclassName || "N/A"}</td>
                </tr>


                <tr className="border-b">
                  <td className="px-6 py-4 text-gray-600 font-semibold">Subject:</td>
                  <td className="px-6 py-4 text-gray-500">{teachSubject?.subName || "N/A"}</td>
                </tr>

            

                {/* Student Number */}
                <tr className="border-b">
                  <td className="px-6 py-4 text-gray-600 font-semibold">Teacher ID:</td>
                  <td className="px-6 py-4 text-gray-500">{currentUser.teacherId}</td>
                </tr>

                {/* Address */}
                <tr className="border-b">
                  <td className="px-6 py-4 text-gray-600 font-semibold">
                    <div className="flex items-center">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
                      Contact Number:
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{currentUser.contact}</td>
                </tr>

                {/* Birthdate */}
                <tr className="border-b">
                  <td className="px-6 py-4 text-gray-600 font-semibold">
                    <div className="flex items-center">
                      Qualifications:
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{currentUser.qualifications}</td>
                </tr>


                <tr className="border-b">
                  <td className="px-6 py-4 text-gray-600 font-semibold">
                    <div className="flex items-center">
                      Experiences:
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{currentUser.experience}</td>
                </tr>


                {/* Email */}
                <tr className="border-b">
                  <td className="px-6 py-4 text-gray-600 font-semibold">
                    <div className="flex items-center">
                      <i className="fas fa-envelope mr-2 text-lg text-gray-500"></i>
                      Email:
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{currentUser.email}</td>
                </tr>

                {/* Gender */}
                <tr>
                  <td className="px-6 py-4 text-gray-600 font-semibold">
                    <div className="flex items-center">
                      <i className="fas fa-genderless mr-2 text-lg text-gray-500"></i>
                      Gender:
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{currentUser.gender}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

      </main>
    </>
  );
}
