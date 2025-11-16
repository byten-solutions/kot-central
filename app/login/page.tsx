import { requireGuest } from "@/lib/auth/utils";
import LoginForm from "@/components/auth/login-form";
import { title } from "@/components/primitives";
import { Card, CardBody, CardHeader } from "@heroui/card";

export default async function LoginPage() {
  await requireGuest();

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 items-center pb-6">
          <h1 className={title({ size: "sm" })}>bytePOS Central</h1>
          <p className="text-small text-default-500">
            Login to manage your stores
          </p>
        </CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </section>
  );
}
