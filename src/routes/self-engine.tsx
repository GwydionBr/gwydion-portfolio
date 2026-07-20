import { createFileRoute } from "@tanstack/react-router";
import { SelfEnginePageContent } from "#/features/projects/self-engine/components/SelfEnginePageContent";
import * as m from "#/generated/paraglide/messages";
import { buildRouteHead } from "#/shared/seo/buildRouteHead";

export const Route = createFileRoute("/self-engine")({
  head: () =>
    buildRouteHead({
      path: "/self-engine",
      title: m.meta_self_engine_title(),
      description: m.meta_self_engine_description(),
    }),
  component: SelfEnginePage,
});

function SelfEnginePage() {
  return <SelfEnginePageContent />;
}
