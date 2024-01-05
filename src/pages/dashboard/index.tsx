import { FiTrash2 } from "react-icons/fi";
import { Container } from "../../components/container";
import { PanelHeader } from "../../components/panelHeader";
import { useContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db, storage } from "../../service/firebaseConnect";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteObject, ref } from "firebase/storage";

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
  images: CarsImageProps[]

}

interface CarsImageProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}
export function Dashboard() {
  const [cars, setCars] = useState<CarsProps[]>([]);  
  const {user} = useContext(AuthContext);

  useEffect(() => {
    function loadCars() {
       if(!user?.uid){
        return;
       }
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));

      getDocs(queryRef)
        .then((snapshot) => {
          const listCars = [] as CarsProps[];

          snapshot.forEach(doc => {
            listCars.push({
              id: doc.id,
              name: doc.data().name,
              year: doc.data().year,
              km: doc.data().km,
              city: doc.data().city,
              price: doc.data().price,
              images: doc.data().images,
              uid: doc.data().uid,
            });
          });

          setCars(listCars);
        })

    }

    loadCars();
  },[user]);



 async function handleDeleteCar(car: CarsProps){
   const itemCar = car; 

   const docRef = doc(db, "cars", itemCar.id);
   await deleteDoc(docRef);

   itemCar.images.map(async(image) => {
       const imagePath = `images/${image.uid}/${image.name}`;
       const imageRef = ref(storage, imagePath);

       try {
         await deleteObject(imageRef);
         setCars(cars.filter(car => car.id !== itemCar.id));
       } catch (error) {
         console.log("error ao deletetar")
       }
  
   });

   
 }
  return (
    <Container>
      <PanelHeader />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map(car => (         
            <section className="w-full bg-white rounded-lg relative">           

              <button
                
                onClick={() => {handleDeleteCar(car) }}
                className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow"
                
                >
                <FiTrash2 size={26} color="#000" />
              </button>
              <img
                src={car.images[0].url}
                className="w-full rounded-lg mb-2 max-h-72"               
               

              />
              <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>
              <div className="flex flex-col px-2">
                <span className="text-zinc-700 mb-6">Ano {car.year} | {car.km} km</span>
                <strong className="text-black font-medium text-xl">{car.price}</strong>
              </div>

              <div className="w-full h-px bg-slate-200 my-2"></div>

              <div className="px-2 pb-2">
                <span className="text-zinc-700">{car.city}</span>
              </div>
            </section>
          
        ))}
      </main>
    </Container>
  )
}