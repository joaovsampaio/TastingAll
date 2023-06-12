import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

import Header from "@/app/components/Header";
import SignUp from "@/app/components/Forms/auth/SignUp";
import SignIn from "@/app/components/Forms/auth/SignIn";

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
              <SignUp />
            </TabsContent>
            <TabsContent value="login">
              <SignIn />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default page;
