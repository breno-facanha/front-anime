import CardAnime from "@/components/CardAnime";
import ModalCreateAnimes from "@/components/ModalCreateAnimes";
import PageWrapper from "@/components/PageWrapper";
import useUserData from "@/hooks/use-user-data";
import instance from "@/instance/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function Animes() {
  const [animes, setAnimes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const user = useUserData()
  console.log(user);

  useEffect(() => {

    async function getAnimes() {     
      try {
        const response = await instance.get('/animes');
        setAnimes(response.data);
      } catch (error) {
        console.error('Erro ao buscar animes:', error);
      } 
    }
    getAnimes();
  }, [])

  console.log(animes);

  async function createAnime(animeData) {
    try {
      const response = await instance.post('/animes', animeData);
      setAnimes([...animes, response.data]);
      setOpenModal(false);
      toast.success('Anime criado com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar anime.');
      console.error('Erro ao criar anime:', error);
    }
  }

  return (
   <PageWrapper className="w-full h-full flex flex-col">
    <div className="w-full flex sm:justify-end justify-center items-center m-5 sm:m-0">
      {user?.role == 'admin' && (
      <button onClick={() => setOpenModal(true)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300">
        Adicionar Anime
      </button>
      )}
    </div>
    <div className="flex flex-col sm:grid sm:grid-cols-3 gap-6 mt-3 justify-center items-center">

      {animes.map((anime) => {
        return ( 
          <CardAnime anime={anime} />
        )
  } )}
    </div>
    <ModalCreateAnimes isOpen={openModal} onClose={() => setOpenModal(false)} onSubmit={createAnime} />
   </PageWrapper>
  );
}