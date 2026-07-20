// Get the full source code, including the theme and Tailwind config:
// https://github.com/resend/react-email/tree/canary/apps/demo/emails

import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email"
import tailwindConfig from "../../tailwind.config"

interface DropboxResetPasswordEmailProps {
  userFirstname?: string
  resetPasswordLink?: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : ""

export const DropboxResetPasswordEmail = ({
  userFirstname,
  resetPasswordLink,
}: DropboxResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-[#f6f9fc] py-2.5">
          <Preview>Dropbox reset your password</Preview>
          <Container className="border border-solid border-[#f0f0f0] bg-white p-[45px]">
            <Img
              src={`${baseUrl}/static/dropbox-logo.png`}
              width="40"
              height="33"
              alt="Dropbox"
            />
            <Section>
              <Text className="font-dropbox text-base leading-[26px] font-light text-[#404040]">
                Hi {userFirstname},
              </Text>
              <Text className="font-dropbox text-base leading-[26px] font-light text-[#404040]">
                Someone recently requested a password change for your Dropbox
                account. If this was you, you can set a new password here:
              </Text>
              <Button
                className="font-dropbox-sans block w-[210px] rounded bg-[#007ee6] px-[7px] py-[14px] text-center text-[15px] text-white no-underline"
                href={resetPasswordLink}
              >
                Reset password
              </Button>
              <Text className="font-dropbox text-base leading-[26px] font-light text-[#404040]">
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text className="font-dropbox text-base leading-[26px] font-light text-[#404040]">
                To keep your account secure, please don&apos;t forward this
                email to anyone. See our Help Center for{" "}
                <Link className="underline" href={resetPasswordLink}>
                  more security tips.
                </Link>
              </Text>
              <Text className="font-dropbox text-base leading-[26px] font-light text-[#404040]">
                Happy Dropboxing!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

DropboxResetPasswordEmail.PreviewProps = {
  userFirstname: "Alan",
  resetPasswordLink: "https://www.dropbox.com",
} as DropboxResetPasswordEmailProps

DropboxResetPasswordEmail.tailwindConfig = tailwindConfig

export default DropboxResetPasswordEmail
