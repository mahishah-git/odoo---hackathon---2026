// ── ISRO Inventory — Shared Data Store ──────────────────────
// This file manages all shared data across pages using localStorage

const DB = {

    // ── Initialize default data if nothing exists ──
    init() {
      if (!localStorage.getItem('isro_products'))   DB.resetProducts();
      if (!localStorage.getItem('isro_receipts'))   DB.resetReceipts();
      if (!localStorage.getItem('isro_deliveries')) DB.resetDeliveries();
      if (!localStorage.getItem('isro_transfers'))  DB.resetTransfers();
      if (!localStorage.getItem('isro_adjustments'))DB.resetAdjustments();
      if (!localStorage.getItem('isro_history'))    DB.resetHistory();
    },
  
    // ── Generic get / save ──
    get(key)       { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } },
    save(key, data){ localStorage.setItem(key, JSON.stringify(data)); },
  
    // ── Products ──
    getProducts()  { return DB.get('isro_products'); },
    saveProducts(d){ DB.save('isro_products', d); },
  
    // ── Receipts ──
    getReceipts()  { return DB.get('isro_receipts'); },
    saveReceipts(d){ DB.save('isro_receipts', d); },
  
    // ── Deliveries ──
    getDeliveries()  { return DB.get('isro_deliveries'); },
    saveDeliveries(d){ DB.save('isro_deliveries', d); },
  
    // ── Transfers ──
    getTransfers()  { return DB.get('isro_transfers'); },
    saveTransfers(d){ DB.save('isro_transfers', d); },
  
    // ── Adjustments ──
    getAdjustments()  { return DB.get('isro_adjustments'); },
    saveAdjustments(d){ DB.save('isro_adjustments', d); },
  
    // ── History (ledger) ──
    getHistory()  { return DB.get('isro_history'); },
    saveHistory(d){ DB.save('isro_history', d); },
  
    // ── Add a history entry ──
    addHistory(entry) {
      const h = DB.getHistory();
      const now = new Date();
      const pad = n => String(n).padStart(2,'0');
      entry.date = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
      h.unshift(entry);
      DB.saveHistory(h);
    },
  
    // ── Reset functions (default mock data) ──
    resetProducts() {
      DB.save('isro_products', [
        { name:'Cryogenic Engine Nozzle', sku:'ISRO-ENG-001', cat:'Engine Parts',   unit:'Pieces',    stock:3,    location:'BLR', reorder:10, history:['+12 Receipt','-5 Delivery','-4 Delivery'] },
        { name:'Titanium Heat Shield',    sku:'ISRO-STR-204', cat:'Structural',     unit:'Pieces',    stock:47,   location:'TVM', reorder:15, history:['+50 Receipt','-3 Adjustment'] },
        { name:'Solar Panel (Satellite)', sku:'ISRO-SAT-033', cat:'Electronics',    unit:'Pieces',    stock:8,    location:'BLR', reorder:20, history:['+20 Receipt','-12 Delivery'] },
        { name:'Liquid Hydrogen Fuel',    sku:'ISRO-LH2-001', cat:'Propellant',     unit:'Litres',    stock:2400, location:'SHR', reorder:500,history:['+3000 Receipt','-600 Delivery'] },
        { name:'Carbon Fibre Panel',      sku:'ISRO-CF-112',  cat:'Structural',     unit:'Sq. Meters',stock:124,  location:'AMD', reorder:30, history:['+150 Receipt','-26 Transfer'] },
        { name:'Space Suit',              sku:'ISRO-GGN-007', cat:'Gaganyaan',      unit:'Pieces',    stock:6,    location:'TVM', reorder:5,  history:['+6 Receipt'] },
        { name:'Oxygen Canister',         sku:'ISRO-GGN-012', cat:'Gaganyaan',      unit:'Pieces',    stock:0,    location:'TVM', reorder:20, history:['+30 Receipt','-30 Delivery'] },
        { name:'Parachute Assembly',      sku:'ISRO-GGN-019', cat:'Gaganyaan',      unit:'Pieces',    stock:4,    location:'BLR', reorder:6,  history:['+6 Receipt','-2 Delivery'] },
        { name:'Gyroscope Sensor',        sku:'ISRO-SAT-044', cat:'Electronics',    unit:'Pieces',    stock:32,   location:'BLR', reorder:10, history:['+40 Receipt','-8 Delivery'] },
        { name:'Reaction Wheel',          sku:'ISRO-SAT-051', cat:'Electronics',    unit:'Pieces',    stock:18,   location:'TVM', reorder:8,  history:['+20 Receipt','-2 Adjustment'] },
        { name:'Thermal Blanket',         sku:'ISRO-STR-088', cat:'Structural',     unit:'Pieces',    stock:55,   location:'AMD', reorder:20, history:['+60 Receipt','-5 Delivery'] },
        { name:'Rocket Fuel Oxidizer',    sku:'ISRO-OX-091',  cat:'Propellant',     unit:'Litres',    stock:1800, location:'SHR', reorder:400,history:['+2000 Receipt','-200 Delivery'] },
        { name:'Communication Antenna',   sku:'ISRO-GND-007', cat:'Ground Support', unit:'Pieces',    stock:12,   location:'SHR', reorder:4,  history:['+15 Receipt','-3 Delivery'] },
        { name:'Hydraulic Pump',          sku:'ISRO-ENG-022', cat:'Engine Parts',   unit:'Pieces',    stock:9,    location:'BLR', reorder:5,  history:['+10 Receipt','-1 Adjustment'] },
        { name:'Star Tracker Sensor',     sku:'ISRO-SAT-067', cat:'Electronics',    unit:'Pieces',    stock:14,   location:'TVM', reorder:6,  history:['+15 Receipt','-1 Delivery'] },
      ]);
    },
  
    resetReceipts() {
      DB.save('isro_receipts', [
        { id:'ISR-001', vendor:'HAL — Hindustan Aeronautics', items:['Cryogenic Engine Nozzle x12','Hydraulic Pump x5'], qty:17, warehouse:'BLR', date:'2026-03-01', status:'Done',      mission:'Gaganyaan Crewed' },
        { id:'ISR-002', vendor:'L&T Aerospace',               items:['Carbon Fibre Panel x50','Titanium Heat Shield x20'], qty:70, warehouse:'AMD', date:'2026-03-03', status:'Done', mission:'Gaganyaan Crewed' },
        { id:'ISR-003', vendor:'DRDO Supply Wing',            items:['Space Suit x6'],            qty:6,  warehouse:'TVM', date:'2026-03-05', status:'Done',      mission:'Gaganyaan Crewed' },
        { id:'ISR-004', vendor:'MTAR Technologies',           items:['Cryogenic Engine Nozzle x8'],qty:8,  warehouse:'BLR', date:'2026-03-06', status:'Done',      mission:'Gaganyaan Crewed' },
        { id:'ISR-005', vendor:'BEL — Bharat Electronics',   items:['Solar Panel (Satellite) x20','Gyroscope Sensor x10'], qty:30, warehouse:'BLR', date:'2026-03-07', status:'Done', mission:'NISAR' },
        { id:'ISR-006', vendor:'Godrej Aerospace',            items:['Parachute Assembly x6'],     qty:6,  warehouse:'BLR', date:'2026-03-08', status:'Done',      mission:'Gaganyaan Crewed' },
        { id:'ISR-007', vendor:'L&T Aerospace',               items:['Reaction Wheel x20','Star Tracker Sensor x15'], qty:35, warehouse:'TVM', date:'2026-03-09', status:'Ready',    mission:'NISAR' },
        { id:'ISR-008', vendor:'Walchandnagar Industries',    items:['Thermal Blanket x60'],       qty:60, warehouse:'AMD', date:'2026-03-10', status:'Ready',     mission:'Gaganyaan Crewed' },
        { id:'ISR-009', vendor:'HAL — Hindustan Aeronautics', items:['Hydraulic Pump x10'],        qty:10, warehouse:'BLR', date:'2026-03-11', status:'Waiting',   mission:'Gaganyaan Crewed' },
        { id:'ISR-010', vendor:'DRDO Supply Wing',            items:['Oxygen Canister x30'],       qty:30, warehouse:'TVM', date:'2026-03-11', status:'Waiting',   mission:'Gaganyaan Crewed' },
        { id:'ISR-011', vendor:'MTAR Technologies',           items:['Cryogenic Engine Nozzle x15'],qty:15,warehouse:'SHR', date:'2026-03-12', status:'Draft',     mission:'Gaganyaan Crewed' },
        { id:'ISR-012', vendor:'BEL — Bharat Electronics',   items:['Communication Antenna x5'],  qty:5,  warehouse:'SHR', date:'2026-03-08', status:'Cancelled', mission:'General Stock' },
      ]);
    },
  
    resetDeliveries() {
      DB.save('isro_deliveries', [
        { id:'DEL-001', dest:'Sriharikota Launch Complex (SHAR)', items:['Cryogenic Engine Nozzle x5','Titanium Heat Shield x10'], qty:15,  warehouse:'BLR', date:'2026-03-01', step:3, status:'Done',    mission:'Gaganyaan Crewed' },
        { id:'DEL-002', dest:'VSSC — Vikram Sarabhai Space Centre', items:['Space Suit x3','Oxygen Canister x10'],                  qty:13,  warehouse:'TVM', date:'2026-03-03', step:3, status:'Done',    mission:'Gaganyaan Crewed' },
        { id:'DEL-003', dest:'Mission Integration Centre',          items:['Parachute Assembly x2'],                                qty:2,   warehouse:'BLR', date:'2026-03-05', step:3, status:'Done',    mission:'Gaganyaan Crewed' },
        { id:'DEL-004', dest:'ISRO HQ Bengaluru',                   items:['Solar Panel (Satellite) x8','Gyroscope Sensor x4'],     qty:12,  warehouse:'BLR', date:'2026-03-07', step:3, status:'Done',    mission:'NISAR' },
        { id:'DEL-005', dest:'HAL Assembly Plant',                  items:['Carbon Fibre Panel x20'],                               qty:20,  warehouse:'AMD', date:'2026-03-08', step:3, status:'Done',    mission:'Gaganyaan Crewed' },
        { id:'DEL-006', dest:'Sriharikota Launch Complex (SHAR)',   items:['Liquid Hydrogen Fuel x500','Rocket Fuel Oxidizer x300'],qty:800, warehouse:'SHR', date:'2026-03-10', step:2, status:'Packing', mission:'Gaganyaan Crewed' },
        { id:'DEL-007', dest:'DRDO Testing Facility',               items:['Thermal Blanket x15'],                                  qty:15,  warehouse:'AMD', date:'2026-03-11', step:1, status:'Picking', mission:'General Stock' },
        { id:'DEL-008', dest:'SAC — Space Applications Centre',     items:['Reaction Wheel x5','Star Tracker Sensor x3'],           qty:8,   warehouse:'TVM', date:'2026-03-12', step:1, status:'Picking', mission:'NISAR' },
        { id:'DEL-009', dest:'VSSC — Vikram Sarabhai Space Centre', items:['Cryogenic Engine Nozzle x8'],                           qty:8,   warehouse:'BLR', date:'2026-03-13', step:0, status:'Draft',   mission:'Gaganyaan Crewed' },
        { id:'DEL-010', dest:'Mission Integration Centre',          items:['Parachute Assembly x2','Space Suit x2'],                qty:4,   warehouse:'TVM', date:'2026-03-13', step:0, status:'Draft',   mission:'Gaganyaan Crewed' },
      ]);
    },
  
    resetTransfers() {
      DB.save('isro_transfers', [
        { id:'TRF-001', from:'BLR — Main Store',     to:'SHR — Launch Pad Store',   items:['Cryogenic Engine Nozzle x5'],           qty:5,   mission:'Gaganyaan Crewed', date:'2026-03-01', status:'Completed', handler:'Field Technician — BLR' },
        { id:'TRF-002', from:'TVM — Main Store',     to:'TVM — Assembly Floor',     items:['Space Suit x3','Parachute Assembly x2'], qty:5,   mission:'Gaganyaan Crewed', date:'2026-03-03', status:'Completed', handler:'Field Technician — TVM' },
        { id:'TRF-003', from:'AMD — Main Store',     to:'BLR — Production Floor',   items:['Carbon Fibre Panel x30'],               qty:30,  mission:'Gaganyaan Crewed', date:'2026-03-05', status:'Completed', handler:'Field Technician — AMD' },
        { id:'TRF-004', from:'BLR — Rack A',         to:'BLR — Rack B',             items:['Gyroscope Sensor x10'],                 qty:10,  mission:'NISAR',            date:'2026-03-06', status:'Completed', handler:'Field Technician — BLR' },
        { id:'TRF-005', from:'TVM — Main Store',     to:'SHR — Launch Pad Store',   items:['Titanium Heat Shield x15'],             qty:15,  mission:'Gaganyaan Crewed', date:'2026-03-07', status:'Completed', handler:'Field Technician — TVM' },
        { id:'TRF-006', from:'BLR — Main Store',     to:'AMD — Rack C',             items:['Thermal Blanket x20'],                  qty:20,  mission:'General Stock',    date:'2026-03-08', status:'Completed', handler:'Field Technician — BLR' },
        { id:'TRF-007', from:'SHR — Propellant Bay', to:'SHR — Launch Pad Store',   items:['Liquid Hydrogen Fuel x200'],            qty:200, mission:'Gaganyaan Crewed', date:'2026-03-10', status:'In Transit', handler:'Field Technician — SHR' },
        { id:'TRF-008', from:'BLR — Rack B',         to:'TVM — Assembly Floor',     items:['Reaction Wheel x5'],                    qty:5,   mission:'NISAR',            date:'2026-03-11', status:'In Transit', handler:'Field Technician — TVM' },
        { id:'TRF-009', from:'AMD — Main Store',     to:'BLR — Production Floor',   items:['Carbon Fibre Panel x25','Thermal Blanket x10'], qty:35, mission:'Gaganyaan Crewed', date:'2026-03-14', status:'Scheduled', handler:'Field Technician — AMD' },
        { id:'TRF-010', from:'BLR — Main Store',     to:'SHR — Launch Pad Store',   items:['Titanium Heat Shield x8'],              qty:8,   mission:'Gaganyaan Crewed', date:'2026-03-14', status:'Scheduled', handler:'Field Technician — BLR' },
        { id:'TRF-011', from:'TVM — Main Store',     to:'TVM — Assembly Floor',     items:['Oxygen Canister x15'],                  qty:15,  mission:'Gaganyaan Crewed', date:'2026-03-15', status:'Scheduled', handler:'Field Technician — TVM' },
      ]);
    },
  
    resetAdjustments() {
      DB.save('isro_adjustments', [
        { id:'ADJ-001', product:'Cryogenic Engine Nozzle', location:'BLR — Rack A',         systemQty:6,   actualQty:3,   delta:-3, reason:'Damaged',        date:'2026-03-02', by:'Field Technician — BLR', notes:'3 nozzles found cracked during pre-launch inspection.' },
        { id:'ADJ-002', product:'Oxygen Canister',         location:'TVM — Assembly Floor', systemQty:5,   actualQty:0,   delta:-5, reason:'Expired',        date:'2026-03-04', by:'Supply Manager',         notes:'5 canisters past pressure certification date.' },
        { id:'ADJ-003', product:'Thermal Blanket',         location:'AMD — Rack C',         systemQty:60,  actualQty:55,  delta:-5, reason:'Damaged',        date:'2026-03-06', by:'Field Technician — AMD', notes:'5 blankets torn during handling.' },
        { id:'ADJ-004', product:'Parachute Assembly',      location:'BLR — Main Store',     systemQty:6,   actualQty:4,   delta:-2, reason:'Misplaced',      date:'2026-03-07', by:'Field Technician — BLR', notes:'2 units not found during count, possibly moved.' },
        { id:'ADJ-005', product:'Gyroscope Sensor',        location:'BLR — Rack A',         systemQty:30,  actualQty:32,  delta:+2, reason:'Found Extra',    date:'2026-03-08', by:'Field Technician — BLR', notes:'2 extra units found in unlabelled box.' },
        { id:'ADJ-006', product:'Solar Panel Satellite',   location:'BLR — Main Store',     systemQty:10,  actualQty:8,   delta:-2, reason:'Damaged',        date:'2026-03-09', by:'Supply Manager',         notes:'2 panels cracked during storage.' },
        { id:'ADJ-007', product:'Hydraulic Pump',          location:'BLR — Main Store',     systemQty:10,  actualQty:9,   delta:-1, reason:'Counting Error', date:'2026-03-10', by:'Field Technician — BLR', notes:'Recount after discrepancy found in log.' },
        { id:'ADJ-008', product:'Carbon Fibre Panel',      location:'AMD — Main Store',     systemQty:120, actualQty:124, delta:+4, reason:'Found Extra',    date:'2026-03-11', by:'Field Technician — AMD', notes:'4 panels found in unmarked pallet.' },
        { id:'ADJ-009', product:'Space Suit',              location:'TVM — Assembly Floor', systemQty:6,   actualQty:6,   delta:0,  reason:'Counting Error', date:'2026-03-12', by:'Supply Manager',         notes:'Recount confirmed system count was correct.' },
      ]);
    },
  
    resetHistory() {
      DB.save('isro_history', [
        { date:'2026-03-14 09:22', type:'Receipt',    product:'Titanium Heat Shield',    qty:'+50',  from:'Vendor — Walchandnagar', to:'BLR — Main Store',     mission:'Gaganyaan Crewed', by:'Supply Manager',         ref:'ISR-008' },
        { date:'2026-03-14 08:45', type:'Transfer',   product:'Oxygen Canister',         qty:'15',   from:'TVM — Main Store',       to:'TVM — Assembly Floor', mission:'Gaganyaan Crewed', by:'Field Technician — TVM', ref:'TRF-011' },
        { date:'2026-03-13 17:30', type:'Delivery',   product:'Cryogenic Engine Nozzle', qty:'-8',   from:'BLR — Main Store',       to:'VSSC',                 mission:'Gaganyaan Crewed', by:'Field Technician — BLR', ref:'DEL-009' },
        { date:'2026-03-12 14:55', type:'Adjustment', product:'Space Suit',              qty:'0',    from:'TVM — Assembly Floor',   to:'TVM — Assembly Floor', mission:'Gaganyaan Crewed', by:'Supply Manager',         ref:'ADJ-009' },
        { date:'2026-03-11 11:40', type:'Adjustment', product:'Carbon Fibre Panel',      qty:'+4',   from:'AMD — Main Store',       to:'AMD — Main Store',     mission:'Gaganyaan Crewed', by:'Field Technician — AMD', ref:'ADJ-008' },
        { date:'2026-03-10 15:20', type:'Delivery',   product:'Liquid Hydrogen Fuel',    qty:'-500', from:'SHR — Propellant Bay',   to:'Sriharikota Launch',   mission:'Gaganyaan Crewed', by:'Field Technician — SHR', ref:'DEL-006' },
        { date:'2026-03-09 12:30', type:'Receipt',    product:'Reaction Wheel',          qty:'+20',  from:'Vendor — L&T Aerospace', to:'TVM — Main Store',     mission:'NISAR',            by:'Supply Manager',         ref:'ISR-007' },
        { date:'2026-03-07 16:30', type:'Delivery',   product:'Solar Panel Satellite',   qty:'-8',   from:'BLR — Main Store',       to:'ISRO HQ Bengaluru',    mission:'NISAR',            by:'Field Technician — BLR', ref:'DEL-004' },
        { date:'2026-03-06 14:40', type:'Transfer',   product:'Gyroscope Sensor',        qty:'10',   from:'BLR — Rack A',           to:'BLR — Rack B',         mission:'NISAR',            by:'Field Technician — BLR', ref:'TRF-004' },
        { date:'2026-03-05 13:30', type:'Transfer',   product:'Carbon Fibre Panel',      qty:'30',   from:'AMD — Main Store',       to:'BLR — Production',     mission:'Gaganyaan Crewed', by:'Field Technician — AMD', ref:'TRF-003' },
        { date:'2026-03-03 10:00', type:'Receipt',    product:'Space Suit',              qty:'+6',   from:'Vendor — DRDO',          to:'TVM — Main Store',     mission:'Gaganyaan Crewed', by:'Supply Manager',         ref:'ISR-003' },
        { date:'2026-03-01 11:00', type:'Receipt',    product:'Cryogenic Engine Nozzle', qty:'+12',  from:'Vendor — HAL',           to:'BLR — Main Store',     mission:'Gaganyaan Crewed', by:'Supply Manager',         ref:'ISR-001' },
        { date:'2026-03-01 09:30', type:'Receipt',    product:'Carbon Fibre Panel',      qty:'+50',  from:'Vendor — L&T Aerospace', to:'AMD — Main Store',     mission:'Gaganyaan Crewed', by:'Supply Manager',         ref:'ISR-002' },
        { date:'2026-03-01 08:00', type:'Receipt',    product:'Solar Panel Satellite',   qty:'+20',  from:'Vendor — BEL',           to:'BLR — Main Store',     mission:'NISAR',            by:'Supply Manager',         ref:'ISR-005' },
      ]);
    },
  
  };
  
  // Auto-init when loaded
  DB.init();