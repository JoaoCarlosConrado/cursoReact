import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Input from "../../../components/Input";
import { api } from "../../../services/api";
import Schedule from "./Schedule";
import empty from "../../../assets/empty.svg";
import useDebounce from "../../../hooks/useDebounce";

import "./styles.css";

function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [isSchedulesLoading, setIsSchedulesLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce((value) => getSchedules(value), 2000);

  function handleSearch(event) {
    const { value } = event.target;
    setSearchTerm(value);
  }

  async function getSchedules(value = "") {
    try {
      setIsSchedulesLoading(true);

      const { data } = await api.get(`/schedules?subject=${value}`);

      setSchedules(data);
    } catch (error) {
      toast.error("Não foi possível carregar os professores. Tente novamente!");
    } finally {
      setIsSchedulesLoading(false);
    }
  }

  async function deleteSchedule(scheduleId) {
    try {
      await api.delete(`/schedules/${scheduleId}`);

      const filteredSchedules = schedules.filter(
        (schedule) => schedule._id !== scheduleId
      );
      setSchedules(filteredSchedules);

      toast.success("Agendamento excluído com sucesso!");
    } catch (error) {
      toast.error(
        "Não foi possível excluír este agendamento. Tente novamente!"
      );
    }
  }

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    getSchedules();
  }, []);

  return (
    <section className="dashboard-container">
      <div className="dashboard-header">
        <Breadcrumbs
          options={[{ label: "Início", path: "/schedules", activeLink: false }]}
        />

        <Link to="/new-schedule" className="link-new-schedule">
          Criar
          <Plus size={20} />
        </Link>
      </div>

      <div className="dashboard-content">
        <Input placeholder="Buscar por um agendamento" onChange={handleSearch} />

        <div className="schedules-list">
          {isSchedulesLoading && !schedules.length > 0 && <p>Carregando...</p>}

          {schedules.length > 0 && (
            <Schedule schedules={schedules} onDelete={deleteSchedule} />
          )}

          {schedules.length === 0 && !isSchedulesLoading && (
            <div className="empty-container">
              <img src={empty} alt="Lista vazia" />

              <h3>Você não possui agendamentos disponíveis!</h3>

              <Link to="/new-schedule">Criar um agendamento</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Schedules;
