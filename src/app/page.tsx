import { LayoutSwitch } from "@/components/shared/LayoutSwitch";
import { SkipLink } from "@/components/shared/SkipLink";
import { WhatsAppFloat } from "@/components/shared/WhatsAppFloat";
import { MobileWebsite } from "@/components/mobile-website/MobileWebsite";
import { Website } from "@/components/website/Website";
import { getSiteMedia } from "@/lib/images";

export default function Home() {
  // Read at build time: put photos into public/images and rebuild / redeploy.
  const media = getSiteMedia();
  return (
    <>
      <SkipLink />
      <LayoutSwitch website={<Website {...media} />} mobile={<MobileWebsite {...media} />} />
      <WhatsAppFloat />
    </>
  );
}
