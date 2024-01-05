import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../service/firebaseConnect";
import { Container } from "../../components/container";
import {FaWhatsapp} from "react-icons/fa";

interface CarsProps {
  id: string,
  name: string,
  model: string,
  whatsapp: string,
  city: string
  year: string
  km: string,
  price: string,
  description: string,
  owner: string,
  images: CarsImageProps[]

}

interface CarsImageProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}



export function CarDetail() {
   
  const {id} = useParams();
  const [car, setCar] = useState<CarsProps>();


  useEffect(()=>{
     if(!id){return}

     const docRef = doc(db, "cars", id);
      getDoc(docRef)
       .then((snapshot)=>{
           
          setCar({
            id: snapshot.id,
            name: snapshot.data()?.name,
            year: snapshot.data()?.year,
            km: snapshot.data()?.km,
            city: snapshot.data()?.city,
            price: snapshot.data()?.price,
            model: snapshot.data()?.model,
            whatsapp: snapshot.data()?.whatsapp,
            images: snapshot.data()?.images,
            uid: snapshot.data()?.uid,
            description: snapshot.data()?.description,
            owner: snapshot.data()?.owner,
          })
       })

     
  },[id])
  
    return (
      <Container>
        <h1>Slider</h1>
        {car &&
           <main className="w-full bg-white rounded-lg p-6 my-4">
             <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
                <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
                <h1 className="font-bold text-3xl text-black"> { car?.price}</h1>
             </div>
             <p>{car?.model}</p>

             <div className="flex w-full gap-6 my-4">
                 <div>
                   <p>Cidade</p>
                   <strong>{car?.city}</strong>
                 </div>

                 <div>
                   <p>Ano</p>
                   <strong>{car?.year}</strong>
                 </div>

                 <div>
                   <p>KM</p>
                   <strong>{car?.km}</strong>
                 </div>
             </div>

              <strong>Descrição:</strong>
              <p className="mb-4">{car?.description}</p>

              <strong>Telefone / whatsapp</strong>
              <p className="">{car?.whatsapp}</p>
              <a className="bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium cursor-pointer">
                Conversar com vendedor
                 <FaWhatsapp size={26} color="#fff"/>
              </a>
           </main>
        }
      </Container>
    )
  }