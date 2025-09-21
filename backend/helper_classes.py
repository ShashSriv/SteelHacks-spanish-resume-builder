class Personal:
    def __init__(self, name='', email='', phone='', location=''):
        self.name = name
        self.email = email
        self.phone = phone
        self.location = location

class Work:
    def __init__(self, role='', start='', end='', description=None):
        self.role = role
        self.start = start
        self.end = end
        self.description1 = ''
        self.description2 = ''

class Education:
    def __init__(self, school='', degree='', start='', end=''):
        self.school = school
        self.degree = degree
        self.start = start
        self.end = end

class Certification:
    def __init__(self, name='', issuer='', year=''):
        self.name = name
        self.issuer = issuer
        self.year = year

class Skills:
    def __init__(self, skills=None):
        self.skills = skills if skills is not None else []


class Resume:
    def __init__(self):
        self.personal = Personal()
        self.work1 = Work()
        self.work2 = Work() 
        self.work3 = Work()               
        self.education = Education()        
        self.certification1 = Certification()    
        self.certification2 = Certification() 
        self.certification3 = Certification() 
        self.skills = Skills()
        self.summary = ''           

    # helper: convert everything into a dict (for JSON)
    def to_dict(self):
        return {
            "personal": self.personal.__dict__,
            "work": [self.work1.__dict__, self.work2.__dict__, self.work3.__dict__],
            "education": self.education.__dict__,  
            "certifications": [
                self.certification1.__dict__,
                self.certification2.__dict__,
                self.certification3.__dict__,
            ],
            "skills": self.skills.__dict__,
            "summary": self.summary,
        }
