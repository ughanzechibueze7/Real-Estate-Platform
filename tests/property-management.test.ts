import { describe, it, expect, beforeEach } from "vitest"

// Mock storage for maintenance requests
const maintenanceRequests = new Map()
let nextRequestId = 1

// Mock functions to simulate contract behavior
function submitMaintenanceRequest(description: string, requester: string) {
  const requestId = nextRequestId++
  maintenanceRequests.set(requestId, { description, requester })
  return requestId
}

function getMaintenanceRequest(requestId: number) {
  return maintenanceRequests.get(requestId)
}

describe("Property Management Contract", () => {
  beforeEach(() => {
    maintenanceRequests.clear()
    nextRequestId = 1
  })
  
  it("should submit a maintenance request", () => {
    const requestId = submitMaintenanceRequest("Fix leaky faucet", "tenant1")
    expect(requestId).toBe(1)
    const request = getMaintenanceRequest(requestId)
    expect(request).toBeDefined()
    expect(request.description).toBe("Fix leaky faucet")
    expect(request.requester).toBe("tenant1")
  })
  
  it("should get maintenance request details", () => {
    const requestId = submitMaintenanceRequest("Fix leaky faucet", "tenant1")
    const request = getMaintenanceRequest(requestId)
    expect(request).toBeDefined()
    expect(request.description).toBe("Fix leaky faucet")
    expect(request.requester).toBe("tenant1")
  })
  
  it("should return undefined for non-existent request", () => {
    const request = getMaintenanceRequest(999)
    expect(request).toBeUndefined()
  })
})

