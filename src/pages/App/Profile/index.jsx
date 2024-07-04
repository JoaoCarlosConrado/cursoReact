import Breadcrumbs from "../../../components/Breadcrumbs";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";

import "./styles.css";

const user = {
    name: "",
    email: "",
    password: "",
    confirm_password: ""
}

function Profile() {
    const [currentUser, setCurrentUser] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userData, setUserData] = useState(user);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    async function getUser() {
        const userStoraged = localStorage.getItem("athena:user");
        const userID = JSON.parse(userStoraged).id;
        setIsLoading(true);
        try {
            const user = await api.get(`/users/${userID}`);
            setCurrentUser(user.data);
            setUserData({
                name: user.data.name,
                email: user.data.email,
                password: user.data.password,
                confirm_password: user.data.confirm_password
            });
        } catch (error) {
            toast.error("Não foi possível carregar o usuário. Tente novamente!");
            console.log(error);
        }
        setIsLoading(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);

        const user = userData;

        try {
            const userStoraged = localStorage.getItem("athena:user");
            const userID = JSON.parse(userStoraged).id;

            await api.patch(`/users/${userID}`, user);
            toast.success("Usuário atualizado com sucesso!");
            getUser();
            localStorage.setItem("athena:user", JSON.stringify({
                ...JSON.parse(userStoraged),
                name: user.name
            }));
            
            // Alerta de gambiarra!!!!
            // coloca um "?" na url para forçar o recarregamento do componente header
            const currentPath = location.pathname;
            if (location.search.includes("?")) {
                navigate(currentPath, { replace: true });
            } else {
                navigate(currentPath + "?", { replace: true });
            }
            //fim da gambiarra
        } catch (error) {
            toast.error("Não foi possível atualizar o usuário. Tente novamente!");
            console.log(error);
        }

        setIsSubmitting(false);
    }

    function handleChange(event) {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <Breadcrumbs
                options={[
                    { label: "Perfil", path: "/profile", activeLink: false }
                ]}
            />
            
            {isLoading ? (<h3 className="loading-profile">Carregando...</h3>) : (
            <div className="profile-container">
                <form className="profile-form" onSubmit={handleSubmit}>
                    <div className="profile-info">
                        <div className="profile-preview">{currentUser?.name?.slice(0, 2)}</div>
                        <span>{currentUser?.name}</span>
                    </div>

                    <div className="profile-data">
                        <Input label="Email" defaultValue={currentUser?.email} disabled/>
                        <Input label="Nome" defaultValue={currentUser?.name} name="name" onChange={handleChange}/>
                        <Input label="Nova senha" type="password" defaultValue={currentUser?.password} disabled/>
                        <Input label="Confirmar senha" type="password" defaultValue={currentUser?.confirm_password} disabled/>

                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Atualizando..." : "Atualizar"}
                        </Button>
                    </div>
                </form>
            </div>)}
        </div>
    );
}

export default Profile;
