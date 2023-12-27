import { FiUpload } from "react-icons/fi";
import { Container } from "../../../components/container";
import { PanelHeader } from "../../../components/panelHeader";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/input";


const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  model: z.string().nonempty("O campo modelo é obrigatório"),
  year: z.string().nonempty("O campo ano é obrigatório"),
  km: z.string().nonempty("O KM é obrigatório"),
  price: z.string().nonempty("O campo preço é obrigatório"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z.string().min(1, "O telefone é obrigatório").refine((value) => /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(value), {
    message: "Número de telefone inválido"
  }),
  description: z.string().nonempty("A descrição é obrigatória")
});

type FormData = z.infer<typeof schema>;

export function New() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <Container>
      <PanelHeader />
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer boder-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div>
            <input type="file" accept="imgae/*" className="opacity-0 cursor-pointer" />
          </div>
        </button>
      </div>
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <p className="mb-2 font-medium">Nome do carro</p>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors.name?.message}
              placeholder="Onix 1.0"

            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Modelo do carro</p>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="O1.0 flex"

            />
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Ano</p>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="2020/2020"

              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Km rodado</p>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="50000"

              />
            </div>
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">WhatsApp</p>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
                placeholder="(061)9 99999999"

              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Cidade</p>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="Belo Horizonte"

              />
            </div>
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Preço</p>
            <Input
              type="text"
              register={register}
              name="price"
              error={errors.price?.message}
              placeholder="R$ 20.000,00"

            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Descrição</p>
             <textarea 
               className="border-2 w-full rounded-md h-24 px-2"
               {...register("description")}
               name="description"
               id="description"
               placeholder="Digite a descrição do carro"
             />
              {errors.description && <p className="mb-1 text-red-500 ">{errors.description.message}</p>}


             
          </div>

          <button type="submit" className="w-full h-10 rounded-md bg-zinc-900 text-white font-medium p-2">
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  )
}