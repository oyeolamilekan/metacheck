import LinkPreviewerV2 from "../../components/LinkPreviewerV2"

export default function SitePage({
  params,
}: {
  params: { domain: string }
}) {
  return <LinkPreviewerV2 initialUrl={params.domain} />
}
