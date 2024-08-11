import { useState, useEffect } from "react";
import "./app.css";
import FormInput from "./components/FormInput";

const App = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    city: "",
    district: "",
    province: "",
    country: "Nepal",
    profilePicture: null,
    phoneNumber: "",
  });

  const [countries, setCountries] = useState([]);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common);
        setCountries(countryNames.sort());
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
    },
    {
      id: 4,
      name: "city",
      type: "text",
      placeholder: "City",
      label: "City",
      required: true,
    },
    {
      id: 5,
      name: "district",
      type: "text",
      placeholder: "District",
      label: "District",
      required: true,
    },
    {
      id: 6,
      name: "province",
      type: "select",
      placeholder: "Province",
      label: "Province",
      options: [
        { value: "", label: "Select Province" },
        { value: "1", label: "Province 1" },
        { value: "2", label: "Province 2" },
        { value: "3", label: "Province 3" },
        { value: "4", label: "Province 4" },
        { value: "5", label: "Province 5" },
        { value: "6", label: "Province 6" },
        { value: "7", label: "Province 7" },
      ],
      required: true,
    },
    {
      id: 7,
      name: "country",
      type: "select",
      placeholder: "Country",
      label: "Country",
      options: countries.map((country) => ({
        value: country,
        label: country,
      })),
      required: true,
    },
    {
      id: 8,
      name: "profilePicture",
      type: "file",
      placeholder: "Profile Picture",
      label: "Profile Picture",
      accept: "image/*",
      required: true,
    },
    {
      id: 9,
      name: "phoneNumber",
      type: "tel",
      placeholder: "Phone Number",
      label: "Phone Number",
      pattern: "^[0-9]{7,}$",
      errorMessage:
        "Phone number must be at least 7 digits and contain only numbers.",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = { ...values };
    
    
    if (formData.profilePicture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formData.profilePicture = reader.result;
        localStorage.setItem("formData", JSON.stringify(formData));
        console.log("Form data saved to localStorage");
      };
      reader.readAsDataURL(formData.profilePicture);
    } else {
      localStorage.setItem("formData", JSON.stringify(formData));
      console.log("Form data saved to localStorage");
    }
  };

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      const file = files[0];
      setValues({ ...values, [name]: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        setProfilePicPreview(null);
      }
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {profilePicPreview && (
          <div className="profile-pic-preview">
            <img src={profilePicPreview} alt="Profile Preview" />
          </div>
        )}
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={input.type === "file" ? undefined : values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;
