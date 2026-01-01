import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GithubIcon, Linkedin, MailIcon, PhoneCall } from "lucide-react"
import TypedText from "../TypedText"
export const ContactBodyContent = () => {
  return <div className="p-10 flex flex-col gap-5 justify-center items-center">
      <h2 className="text-3xl font-bold">Hey... Do you want or need to contact Shirugame's developer?</h2>
      <div className="flex flex-col gap-4 justify-center items-center">
        <Button asChild><a href="mailto:ferrissushi@gmail.com"><MailIcon />Contact him</a></Button>
        <Separator />
        <div className="flex flex-row gap-2 justify-center items-center">
          <Button variant="outline" asChild>
            <a href="https://github.com/ferrissushi" target="_blank" rel="noopener nereferrer"><GithubIcon /></a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://www.linkedin.com/in/ferrissusshi/" target="_blank" rel="noopener nereferrer"><Linkedin /></a>
          </Button>
          <Button variant="outline" asChild>
            <a href="tel:+261381584053">
              <PhoneCall />
            </a>
          </Button>
        </div>
      </div>
      <TypedText strings={["A lot of love from @ferrissushi"]}/>
    </div>
}
