;; Property Management Contract

;; Define data structures
(define-map maintenance-requests
  { request-id: uint }
  {
    description: (string-utf8 256),
    requester: principal
  }
)

(define-data-var next-request-id uint u1)

;; Error codes
(define-constant err-request-not-found (err u100))

;; Functions
(define-public (submit-maintenance-request (description (string-utf8 256)))
  (let
    ((request-id (var-get next-request-id)))
    (map-set maintenance-requests
      { request-id: request-id }
      {
        description: description,
        requester: tx-sender
      }
    )
    (var-set next-request-id (+ request-id u1))
    (ok request-id)
  )
)

(define-read-only (get-maintenance-request (request-id uint))
  (map-get? maintenance-requests { request-id: request-id })
)

