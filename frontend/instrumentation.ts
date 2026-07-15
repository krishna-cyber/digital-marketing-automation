export async function register() {
  if (
    process.env["NEXT_RUNTIME"] === "nodejs" &&
    process.env.NODE_ENV === "development"
  ) {
    const { ServerEventBus } =
      await import("@tanstack/devtools-event-bus/server")
    const bus = new ServerEventBus()
    await bus.start()
  }
}
