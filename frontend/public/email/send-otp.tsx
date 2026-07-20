// Get the full source code, including the theme and Tailwind config:
// https://github.com/resend/react-email/tree/canary/apps/demo/emails

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Tailwind,
  Text,
} from "react-email"
import tailwindConfig from "../../tailwind.config"

interface PlaidVerifyIdentityEmailProps {
  validationCode?: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : ""

export const PlaidVerifyIdentityEmail = ({
  validationCode,
}: PlaidVerifyIdentityEmailProps) => (
  <Html>
    <Head />
    <Tailwind config={tailwindConfig}>
      <Body className="font-plaid bg-white">
        <Container className="mx-auto my-0 mt-5 max-w-[360px] rounded border border-solid border-[#eee] bg-white px-0 pt-[68px] pb-[130px] shadow-md shadow-[rgba(20,50,70,.2)]">
          <Img
            src={`${baseUrl}/static/plaid-logo.png`}
            width="212"
            height="88"
            alt="Plaid"
            className="mx-auto my-0"
          />
          <Text className="mx-2 mt-4 mb-2 h-4 text-center text-[11px] leading-[16px] font-bold tracking-[0] text-[#0a85ea] uppercase">
            Verify Your Identity
          </Text>
          <Heading className="my-0 inline-block text-center font-[HelveticaNeue-Medium,Helvetica,Arial,sans-serif] text-[20px] leading-[24px] font-medium text-black">
            Enter the following code to finish linking Venmo.
          </Heading>
          <Section className="mx-auto mt-4 mb-3.5 w-[280px] rounded bg-[rgba(0,0,0,.05)] align-middle font-[HelveticaNeue-Bold]">
            <Text className="mx-auto my-0 block py-2 text-center text-[32px] leading-10 font-bold tracking-[6px] text-black">
              {validationCode}
            </Text>
          </Section>
          <Text className="m-0 px-10 py-0 text-center text-[15px] leading-[23px] tracking-[0] text-[#444]">
            Not expecting this email?
          </Text>
          <Text className="m-0 px-10 py-0 text-center text-[15px] leading-[23px] tracking-[0] text-[#444]">
            Contact{" "}
            <Link
              href="mailto:login@plaid.com"
              className="text-[#444] underline"
            >
              login@plaid.com
            </Link>{" "}
            if you did not request this code.
          </Text>
        </Container>
        <Text className="m-0 mt-5 text-center text-xs leading-[23px] font-extrabold tracking-[0] text-black uppercase">
          Securely powered by Plaid.
        </Text>
      </Body>
    </Tailwind>
  </Html>
)

PlaidVerifyIdentityEmail.PreviewProps = {
  validationCode: "144833",
} as PlaidVerifyIdentityEmailProps

export default PlaidVerifyIdentityEmail
