import instance from "@/instance/api";
import { useEffect, useState } from "react";
import Header from "../Header";

export default function PageWrapper({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    // Verifica se o usuário está autenticado
    const token = localStorage.getItem('token');
    if (!token) {
      // Se não estiver autenticado, redireciona para a página de login
      window.location.href = '/';
    }

    async function heartBeat() {
      try {
        const user = await instance.get('/profile')
        localStorage.setItem('user', JSON.stringify(user.data)); // Armazena os dados do usuário no localStorage
      } catch (error) {
        localStorage.removeItem('token'); // Remove o token do localStorage
        localStorage.removeItem('user'); // Remove os dados do usuário do localStorage
        window.location.href = '/';
      }
    }
    heartBeat();

    setIsLoading(false);
  // Aqui você pode fazer uma requisição para verificar o token, se necessário
  }
, []);
  return (
    <div className="w-full min-h-screen flex flex-col"> 
      <Header />
        <div className="w-full h-full pt-[75px] px-8 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
                {children}
        </div>
    </div>
  );
}
// This component wraps the page content in a centered container with padding and shadow.