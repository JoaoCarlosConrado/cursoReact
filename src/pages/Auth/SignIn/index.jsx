import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Link from "../../../components/Link";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";

import "./styles.css"

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setIsLoading(true);
      
            const formData = {
              email,
              password
            };
      
            const response = await api.post("/session", formData);
      
            localStorage.setItem("athena:user", JSON.stringify(response.data.user));
            console.log(response.data.user)

            toast.success("Login efetuado com sucesso!");
            navigate("/schedules", { replace: true });
          } catch (error) {
            console.error(error);
            toast.error("Email e/ou Senha incorreta. Tente novamente!");
          } finally {
            setIsLoading(false);
          }
    }

    return (
        <div className="container">
            <div className="content">
                <h1>
                Gerencie <br />
                seus <br />
                <span>horários</span>.
                </h1>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Input type={"email"} placeholder={"E-mail"} onChange={(event) => setEmail(event.target.value)}/>
                        <span id="email-error-message"></span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Input  type={"password"} placeholder={"Senha"} onChange={(event) => setPassword(event.target.value)}/>
                        <span id="password-error-message"></span>
                    </div>

                    <Link href="/signUp" target="_self">Cadastre-se aqui 👈</Link>

                    <Button type={"submit"} disabled={isLoading}>
                        {isLoading ? "Carregando..." : "Entrar"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;