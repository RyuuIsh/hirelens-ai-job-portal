import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import Loader from "../components/Loader";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import PrimaryButton from "../components/PrimaryButton";

function EditJob({ darkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        const job = res.data;

        setFormData({
          title: job.title || "",
          company: job.company || "",
          location: job.location || "",
          salary: job.salary || "",
          description: job.description || "",
        });
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    try {
        setSaving(true);

        const payload = {
        ...formData,
        salary: formData.salary ? Number(formData.salary) : undefined,
        };

        const res = await API.put(`/jobs/${id}`, payload);

        toast.success(res.data.message || "Job updated successfully");
        navigate("/manage-posted-jobs");
    } catch (err) {
        toast.error(err.response?.data?.message || "Failed to update job");
    } finally {
        setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Loading job details..." />;
  }

  return (
    <PageContainer darkMode={darkMode}>
      <PageHeader
        darkMode={darkMode}
        title="Edit Job"
        subtitle="Update your posted job details."
      />

      <SectionCard darkMode={darkMode}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            style={{
              ...styles.input,
              backgroundColor: darkMode ? "#111827" : "white",
              color: darkMode ? "#f9fafb" : "#111827",
              border: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
            }}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            style={{
              ...styles.input,
              backgroundColor: darkMode ? "#111827" : "white",
              color: darkMode ? "#f9fafb" : "#111827",
              border: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
            }}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            style={{
              ...styles.input,
              backgroundColor: darkMode ? "#111827" : "white",
              color: darkMode ? "#f9fafb" : "#111827",
              border: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
            }}
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            style={{
              ...styles.input,
              backgroundColor: darkMode ? "#111827" : "white",
              color: darkMode ? "#f9fafb" : "#111827",
              border: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
            }}
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            style={{
              ...styles.textarea,
              backgroundColor: darkMode ? "#111827" : "white",
              color: darkMode ? "#f9fafb" : "#111827",
              border: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
            }}
            required
          />

          <PrimaryButton type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </PrimaryButton>
        </form>
      </SectionCard>
    </PageContainer>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
  },
  textarea: {
    padding: "12px",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
    resize: "vertical",
  },
};

export default EditJob;