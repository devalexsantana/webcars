import { FiUpload } from "react-icons/fi";
import { Container } from "../../../components/container";
import { PanelHeader } from "../../../components/panelHeader";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

 
const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  model: z.string().nonempty("O campo modelo é obrigatório"),
  year: z.string().nonempty("O campo ano é obrigatório"),
  km: z.string().nonempty("O KM é obrigatório"),
  price: z.string().nonempty("O campo preço é obrigatório"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z.string().min(1, "O telefone é obrigatório").refine((value)=> /ˆ(\d{10,11})$/.test(value) ,{
    message: "Número de telefone inválido"
  }),
  description:z.string().nonempty("A descrição é obrigatória")
});

type FormData = z.infer<typeof schema>;

export function New() {
 
  const {register,handleSubmit,formState: {errors}, reset} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

    return (
      <Container>
        <PanelHeader />
        <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
            <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer boder-gray-600 h-32 md:w-48">
                <div className="absolute cursor-pointer">
                   <FiUpload  size={30} color="#000"/>
                </div>
                <div>
                   <input type="file" accept="imgae/*" className="opacity-0 cursor-pointer"/>
                </div>
            </button>
        </div>
        <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
            <form>
              
            </form>
        </div>
     </Container>
    )
  }