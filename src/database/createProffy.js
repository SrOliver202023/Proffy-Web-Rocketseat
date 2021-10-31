module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
  // inserir dados na proffys
  // esperar sempre na vida...
  //  await quando o async vier antes de uma function
  const insertedProffy = await db.run(`
    INSERT INTO proffys (
      name,
      avatar,
      whatssap,
      bio
    ) VALUES (
      "${proffyValue.name}",
      "${proffyValue.avatar}",
      "${proffyValue.whatssap}",
      "${proffyValue.bio}"
    );
  `)
  
  const proffy_id = insertedProffy.lastID

  //  inserir dados na tabela classes
  const insertedClass = await db.run(`
      INSERT INTO classes (
        subject,
        cost,
        proffy_id
      ) VALUES (
        "${classValue.subject}",
        "${classValue.cost}",
        "${proffy_id}"
      );
  `)
  
  const class_id = insertedClass.lastID
 
  // Inserir dados na tabela class_schedule_values
  const  insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
    return db.run(`
      INSERT INTO class_schedule (
        class_id,
        weekday,
        time_from,
        time_to
      
      ) VALUES (
        "${class_id}",
        "${classScheduleValue.weekday}",
        "${classScheduleValue.time_from}",
        "${classScheduleValue.time_to}"
      );
    `)
  })
  // aqui vou executar todos os db.runs() das classes _schedules
  // await Promise.all(insertedAllClassScheduleValues) a promessa de todos ksjksjksjkjsk
  await Promise.all(insertedAllClassScheduleValues)

}