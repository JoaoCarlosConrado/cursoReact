import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Breadcrumbs from "../../../components/Breadcrumbs";
import Field from "../../../components/Field";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";

import { api } from "../../../services/api";

import "./styles.css";

function NewSchedule() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  async function createSchedule(event) {
    event.preventDefault();

    try {
      setIsCreating(true);

      const dateFormatted = date.replace("-", "/").replace("-", "/");

      const formData = {
        subject,
        description,
        userId,
        date: `${dateFormatted} ${time}`,
      };

      await api.post("/schedules", formData);

      toast.success("Agendamento criado com sucesso!");
      navigate("/schedules", { replace: true });
    } catch (error) {
      toast.error("Não foi possível criar um agendamento. Tente novamente!");
    } finally {
      setIsCreating(false);
    }
  }

  async function getTeachers() {
    try {
      const { data } = await api.get("/users?role=TEACHER");

      const teachers = data.map((teacher) => {
        return {
          label: teacher.name,
          value: teacher._id,
        };
      });

      setTeachers(teachers);
    } catch (error) {
      toast.error("Não foi possível carregar os professores. Tente novamente!");
    }
  }

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <div className="new-schedule-container">
      <Breadcrumbs
        options={[
          { label: "Início", path: "/schedules", activeLink: false },
          { label: "Novo", path: "/new-schedule", activeLink: true },
        ]}
      />

      <form onSubmit={createSchedule} className="form-container">
        <Field>
          <label htmlFor="subject">Assunto</label>

          <Input
            placeholder="TCC"
            id="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </Field>

        <Field>
          <label htmlFor="teacher">Professor</label>

          <Select
            options={teachers}
            id="teacher"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />
        </Field>

        <Field>
          <label htmlFor="description">Descrição</label>

          <Textarea
            placeholder="Discutir tema do TCC..."
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Field>

        <div className="field-group">
          <Field>
            <label htmlFor="date">Data</label>

            <Input
              id="date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </Field>

          <Field>
            <label htmlFor="time">Horário</label>

            <Input
              type="time"
              id="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </Field>
        </div>

        <small>Todos os campos são obrigatórios.</small>

        <div className="button-group">
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Criando..." : "Criar"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewSchedule;