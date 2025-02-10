import { describe, it, expect, beforeEach } from "vitest"

// Mock storage for properties
const properties = new Map()
let nextPropertyId = 1

// Mock functions to simulate contract behavior
function tokenizeProperty(owner: string, name: string, location: string, totalSupply: number, pricePerToken: number) {
  const propertyId = nextPropertyId++
  properties.set(propertyId, { owner, name, location, totalSupply, pricePerToken })
  return propertyId
}

function transferProperty(propertyId: number, sender: string, recipient: string) {
  const property = properties.get(propertyId)
  if (!property) throw new Error("Property not found")
  if (property.owner !== sender) throw new Error("Unauthorized")
  property.owner = recipient
  properties.set(propertyId, property)
  return true
}

function getProperty(propertyId: number) {
  return properties.get(propertyId)
}

function getPropertyOwner(propertyId: number) {
  const property = properties.get(propertyId)
  return property ? property.owner : null
}

describe("Property Tokenization Contract", () => {
  beforeEach(() => {
    properties.clear()
    nextPropertyId = 1
  })
  
  it("should tokenize a property", () => {
    const propertyId = tokenizeProperty("owner1", "Luxury Apartment", "New York", 1000, 100)
    expect(propertyId).toBe(1)
    const property = getProperty(propertyId)
    expect(property).toBeDefined()
    expect(property.name).toBe("Luxury Apartment")
    expect(property.owner).toBe("owner1")
  })
  
  it("should transfer a property", () => {
    const propertyId = tokenizeProperty("owner1", "Luxury Apartment", "New York", 1000, 100)
    const result = transferProperty(propertyId, "owner1", "owner2")
    expect(result).toBe(true)
    expect(getPropertyOwner(propertyId)).toBe("owner2")
  })
  
  it("should not transfer a property if not the owner", () => {
    const propertyId = tokenizeProperty("owner1", "Luxury Apartment", "New York", 1000, 100)
    expect(() => transferProperty(propertyId, "owner2", "owner3")).toThrow("Unauthorized")
  })
  
  it("should get property details", () => {
    const propertyId = tokenizeProperty("owner1", "Luxury Apartment", "New York", 1000, 100)
    const property = getProperty(propertyId)
    expect(property).toBeDefined()
    expect(property.name).toBe("Luxury Apartment")
    expect(property.location).toBe("New York")
    expect(property.totalSupply).toBe(1000)
    expect(property.pricePerToken).toBe(100)
  })
})

