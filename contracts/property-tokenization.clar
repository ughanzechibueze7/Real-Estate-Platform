;; Property Tokenization Contract

;; Define data structures
(define-non-fungible-token property uint)

(define-map properties
  { property-id: uint }
  {
    owner: principal,
    name: (string-utf8 64),
    location: (string-utf8 256),
    total-supply: uint,
    price-per-token: uint
  }
)

(define-data-var next-property-id uint u1)

;; Error codes
(define-constant err-unauthorized (err u100))
(define-constant err-property-not-found (err u101))
(define-constant err-insufficient-tokens (err u102))

;; Functions
(define-public (tokenize-property (name (string-utf8 64)) (location (string-utf8 256)) (total-supply uint) (price-per-token uint))
  (let
    ((property-id (var-get next-property-id)))
    (try! (nft-mint? property property-id tx-sender))
    (map-set properties
      { property-id: property-id }
      {
        owner: tx-sender,
        name: name,
        location: location,
        total-supply: total-supply,
        price-per-token: price-per-token
      }
    )
    (var-set next-property-id (+ property-id u1))
    (ok property-id)
  )
)

(define-public (transfer-property (property-id uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender (unwrap! (nft-get-owner? property property-id) err-property-not-found)) err-unauthorized)
    (try! (nft-transfer? property property-id tx-sender recipient))
    (ok true)
  )
)

(define-read-only (get-property (property-id uint))
  (map-get? properties { property-id: property-id })
)

(define-read-only (get-property-owner (property-id uint))
  (nft-get-owner? property property-id)
)

