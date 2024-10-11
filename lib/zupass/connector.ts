import { connect, Zapp } from "@parcnet-js/app-connector";

const FrogZoneLogin: Zapp = {
  name: "FrogZone Login",
  permissions: {
    READ_PUBLIC_IDENTIFIERS: {},
  },
};

// Function to initialize the connection and return the z instance
export function initializeZConnection(elementId: string): any | null {
  // Ensure this runs in a browser environment
  if (typeof window !== "undefined") {
    const element = document.getElementById(elementId) as HTMLElement;

    if (element) {
      const clientUrl = "https://zupass.org";
      const z = connect(FrogZoneLogin, element, clientUrl); // Create the connection
      return z; // Return the z instance for further queries
    } else {
      console.error(`Element with id "${elementId}" not found.`);
    }
  }

  return null;
}

// Example usage outside of React
const zInstance = initializeZConnection("app-connector");

if (zInstance) {
  // Use zInstance for further queries or methods
  console.log("Z instance initialized:", zInstance);
  // Example: Call methods on the zInstance
  if (zInstance.someMethod) {
    zInstance.someMethod(); // Replace with actual method
  }
} else {
  console.error("Failed to initialize Z instance.");
}
