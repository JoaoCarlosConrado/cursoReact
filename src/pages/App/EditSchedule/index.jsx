import { toast } from "sonner"

import { api } from "../../../services/api";

import Breadcrumbs from "../../../components/Breadcrumbs";
import Field from "../../../components/Field";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./styles.css";

const initialState = {
  subject: "",
  description: "",
  userId: "",
  date: "",
  time: "",
}

function EditSchedule() {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [schedule, setSchedule] = useState(initialState)

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

  async function getScheduleById(scheduleId) {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/schedules/${scheduleId}`);

      const [date, time] = data.date.split(" ");

      const dateFormatted = date.replace("/", "-").replace("/", "-");

      setSchedule({
          ...data,
          date: dateFormatted,
          time,
        })

    } catch (error) {
      toast.error("Não foi possível carregar o agendamento. Tente novamente!");
    }
    setIsLoading(false)
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setSchedule((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {

      await api.put(`/schedules/${scheduleId}`, {
        ...schedule,
        date: `${schedule.date.replace("-", "/").replace("-", "/")} ${schedule.time}`,
      });

      toast.success("Agendamento atualizado com sucesso!");
      navigate("/schedules", { replace: true })
    } catch (error) {
      toast.error("Não foi possível atualizar o agendamento. Tente novamente!");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    getTeachers();
  }, [])

  useEffect(() => {
    if(scheduleId) {
      getScheduleById(scheduleId);
    }
  }, [])

  return (
    <div className="edit-schedule-container">
      <Breadcrumbs
        options={[
          { label: "Início", path: "/schedules", activeLink: false },
          { label: "Editar", path: `/edit-schedule/${scheduleId}`, activeLink: true },
        ]}
      />

        {isLoading  ? (<span>Carregando...</span>): (
          <form onSubmit={handleSubmit} className="form-container">
          <Field>
            <label htmlFor="subject">Assunto</label>
  
            <Input placeholder="TCC" id="subject" name="subject" defaultValue={schedule.subject} onChange={handleChange}/>
          </Field>
  
          <Field>
            <label htmlFor="teacher">Professor</label>
  
            <Select options={teachers} id="teacher" name="userId" defaultValue={schedule.userId} onChange={handleChange}/>
          </Field>
          
          <Field>
            <label htmlFor="description">Descrição</label>
  
            <Textarea placeholder="Discutir tema do TCC..." id="description" name="description" defaultValue={schedule.description} onChange={handleChange}/>
          </Field>
  
          <div className="field-group">
            <Field>
              <label htmlFor="date">Data</label>
  
              <Input id="date" name="date" defaultValue={schedule.date} onChange={handleChange}/>
            </Field>
  
            <Field>
              <label htmlFor="time">Horário</label>
  
              <Input type="time" id="time" name="time" defaultValue={schedule.time} onChange={handleChange}/>
            </Field>
          </div>
  
          <small>Todos os campos são obrigatórios.</small>
  
          <div className="button-group">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
        )}
      
    </div>
  )
}

export default EditSchedule;
