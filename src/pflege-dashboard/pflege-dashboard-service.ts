export function createPflegeDashboardHtml(): string {
    return `
    <div class="timeslots-container">
      <h2>Pflege Dashboard</h2>
      <div class="timeslots">
        <div class="slot-day-separator"/>
        <div hx-get="/slots/20250401-1400" hx-trigger="revealed" hx-target="this" hx-swap="outerHTML">Loading slot...</div>
        <div hx-get="/slots/20250401-1500" hx-trigger="revealed" hx-target="this" hx-swap="outerHTML">Loading slot...</div>
        <div hx-get="/slots/20250401-1600" hx-trigger="revealed" hx-target="this" hx-swap="outerHTML">Loading slot...</div>
        <div class="slot-day-separator"/>
        <div hx-get="/slots/20250402-1400" hx-trigger="revealed" hx-target="this" hx-swap="outerHTML">Loading slot...</div>
        <div hx-get="/slots/20250402-1500" hx-trigger="revealed" hx-target="this" hx-swap="outerHTML">Loading slot...</div>
        <div hx-get="/slots/20250402-1600" hx-trigger="revealed" hx-target="this" hx-swap="outerHTML">Loading slot...</div>
        <div class="slot-day-separator"/>
        <div hx-get="/slots/20250403-1400" hx-trigger="revealed" hx-target="this" hx-swap="outerHTML">Loading slot...</div>
        <div hx-get="/slots/20250403-1500" hx-trigger="revealed" hx-target="this" hx-swap="outerHTML">Loading slot...</div>
        <div hx-get="/slots/20250403-1600" hx-trigger="revealed" hx-target="this" hx-swap="outerHTML">Loading slot...</div>
      </div>
    </div>
    `;
  }
  