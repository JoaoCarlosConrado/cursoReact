import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { api } from "../../../services/api";

import "./styles.css";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsLoading(true);

      const formData = {
        name,
        email,
        password,
        confirm_password,
      };

      await api.post("/users", formData);

      toast.success("Usuário cadastrado com sucesso!");
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error.response.status);
      toast.error("Erro ao cadastro o usuário. Tente novamente!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="sign-up-container">
      <form onSubmit={handleSubmit}>
        <h1>Crie sua conta</h1>

        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Input
          type="password"
          placeholder="Confirmar senha"
          value={confirm_password}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <Link to="/">Voltar para login 👈</Link>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
    </div>
  );
}

export default SignUp;