INSERT INTO patients ( 
  patient_name,
  MRN,
  injury,
  HPI,
  plan
  )
  VALUES
    ("Chang", "0207890", "Femoral neck fracture", "31YO M w/ too much work.", ""),
    ("Heejin", "3987105", "Femoral neck fracture", "29YO F w/ lots of love.", ""),
    ("Mom", "0298720", "Femoral neck fracture", "55YO F who is great.", ""),
    ("Pop", "1598023", "Femoral neck fracture," "61YO M who is also great." ,"")

INSERT INTO Injuries_directory (
  body_part,
  body_part_specific,
  injury_name,
  description,
  importance,
  )
  VALUES 
    ("Femur", "Femoral head", "Femoral head fracture, Pipkin I", "Fx limited to below fovea/ligamentum (small)", "Does not involve the weightbearing portion of the femoral head"),
    ("Femur", "Femoral head", "Femoral head fracture, Pipkin II", "Fx extends to above fovea/ligamentum (larger)", "Involves the weightbearing portion of the femoral head"),
    ("Femur", "Femoral head", "Femoral head fracture, Pipkin III", "Type I or II with associated femoral neck fx", "High risk of AVN"),
    ("Femur", "Femoral head", "Femoral head fracture, Pipkin IV", "Type I or II with associated acetabular fx", "Usually posterior wall fracture")

INSERT INTO History_and_Physical ( 
  body_part,
  body_part_specific,
  injury_name,
  type,
  instructions   
  )
  VALUES
    ("Femur", "Femoral head", "History", "Ask for mechanism (high vs low energy to screen for associated injuries), ambulatory status, PMH, tobacco/EtOH/drugs",
    ("Femur", "Femoral head", "Neuro", "Check for signs of sciatic nerve injury",
    ("Femur", "Femoral head", "Physical", "Secondary survey",
    ("Femur", "Femoral head", "Physical", "Check for signs of posterior hip dislocation (limb is flexed, adducted, internally rotated)",
    ("Femur", "Femoral head", "Physical", "Check for signs of anterior hip dislocation (limb is flexed, abducted, externally rotated)"
     
INSERT INTO Images ( 
  body_part,
  body_part_specific,
  injury_name,
  image_type,
  indication
  )
  VALUES
    ("Femur", "Femoral head", "Xray", "AP pelvis, lateral, and Judet views (both pre and post-reduction)", "Look for associated femoral neck and acetabulum injury."),
    ("Femur", "Femoral head", "Xray", "Inlet/outlet views", "To assess acetabular/pelvic ring injury"),
    ("Femur", "Femoral head", "CT", "CT after reduction", "In order, look for concentric reduction, loose bodies in joint, acetabular fracture, posterior pelvic ring injury, femoral neck/head fracture, impaction"),

INSERT INTO Labs ( 
  body_part
  injury_name,
  lab_type,
  indication,
  lab_values
  )
  VALUES
    ("Default", "", "", ""),
    ("Hip reduction"),
    ("Short arm splint"),
    ("Long arm splint"),
    ("Coaptation splint"),
    ("Short leg splint"),
    ("Long leg splint")

INSERT INTO Treatment (
  body_part,
  body_part_specific,
  injury_name,
  operative_or_not,
  indications,
  treatment_options,
  )
  VALUES
    ("Femur", "Femoral head", "Femoral head fracture, Pipkin I", "Non-operative", 
      "If dislocated, reducible and stable. ||
      No loose intracapsular bodies.", 
      "TDWB x 4-6 wks, restrict adduction and internal rotation to prevent dislocation."),
    ("Femur", "Femoral head", "Femoral head fracture, Pipkin I", "Operative", 
      "Irreducible fracture-dislocation. ||
      Elderly patients > 60", 
      "ORIF w/ 2.7mm or 3.5mm lag screws in younger patients ||
      THA or hemiarthroplasty in older patients"),

    ("Femur", "Femoral head", "Femoral head fracture, Pipkin II", "Non-operative", 
      "If dislocated, reducible and stable. ||
      No loose intracapsular bodies. ||
      Undisplaced Pipkin II w/ < 1mm step-off.",
      "TDWB x 4-6 wks, restrict adduction and internal rotation to prevent dislocation."),
    ("Femur", "Femoral head", "Femoral head fracture, Pipkin II", "Operative", 
      "Irreducible fracture-dislocation. ||
      Loose intracapsular bodies. || 
      Displaced Pipkin II w/ > 1mm step-off.", 
      "ORIF w/ 2.7mm or 3.5mm lag screws in younger patients. ||
      THA or hemiarthroplasty in older patients."),
    
    ("Femur", "Femoral head", "Femoral head fracture, Pipkin III", "Non-operative", 
      "If medically unfit or non-ambulatory.", 
      "Limit mobilization and closely follow-up in clinic."),
    ("Femur", "Femoral head", "Femoral head fracture, Pipkin III", "Operative", 
      "If medically fit and ambulatory.",
      "ORIF w/ 2.7mm or 3.5mm lag screws in younger patients. ||
      THA or hemiarthroplasty in older patients."),
    
    ("Femur", "Femoral head", "Femoral head fracture, Pipkin IV", "Non-operative", 
      "If medically unfit or non-ambulatory",
      "TDWB x 4-6 wks, restrict adduction and internal rotation to prevent dislocation."),
    ("Femur", "Femoral head", "Femoral head fracture, Pipkin IV", "Operative", 
      "If medically fit and ambulatory.",
      "ORIF of acetabulum and femoral head. || 
      THA or hemiarthroplasty in older patients.") 
      
INSERT INTO Technique (  
  technique_name,
  instructions,
  anatomy,
  images,
  video
  )
  VALUES
    ("Hip reduction"),
    ("Short arm splint"),
    ("Long arm splint"),
    ("Coaptation splint"),
    ("Short leg splint"),
    ("Long leg splint")