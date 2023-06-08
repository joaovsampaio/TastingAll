import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Register, Login } from "@/components/Forms/FormUser";
import Header from "@/components/Header";

function page({ params }: { params: { slug: string } }) {
  return (
    <div className="bg-hero min-h-screen">
      <Header />
      <main className="flex items-center justify-center mt-2">
        <div className="max-md:w-11/12 p-5 rounded-md shadow-lg backdrop-saturate-200 backdrop-blur-md">
          <Tabs defaultValue={params.slug} className="w-[400px] max-md:w-full">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="register">Criar Conta</TabsTrigger>
                <TabsTrigger value="login">Entrar</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="register">
              <Register />
            </TabsContent>
            <TabsContent value="login">
              <Login />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default page;
