```
┌───────────────────────────────────┐   ┌──────────────────────────────────────────────────────────────────┐   ┌───────────────────────────────────┐
│              acronym              │   │                           acronym_tag                            │   │                tag                │
├───────────────────────────────────┤   ├──────────────────────────────────────────────────────────────────┤   ├───────────────────────────────────┤
│id UUID DEFAULT uuid_generate_v4 ()├─┐ │acronym_id UUID                                                   │ ┌─┤id UUID DEFAULT uuid_generate_v4 ()│
│abbr TEXT NOT NULL                 │ │ │tag_id UUID                                                       │ │ │value TEXT NOT NULL                │
│meaning TEXT NOT NULL              │ │ │PRIMARY KEY (acronym_id, tag_id)                                  │ │ │PRIMARY KEY (id)                   │
│PRIMARY KEY (id)                   │ ├─┤FOREIGN KEY (acronym_id) REFERENCES acronym (id) ON DELETE CASCADE│ │ │                                   │
│UNIQUE (abbr)                      │ │ │FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE        ├─┘ │                                   │
│                                   │ │ │                                                                  │   │                                   │
│                                   │ │ │                                                                  │   │                                   │
└───────────────────────────────────┘ │ └──────────────────────────────────────────────────────────────────┘   └───────────────────────────────────┘
                                      │ ┌──────────────────────────────────────────────────────────────────┐
                                      │ │                              report                              │
                                      │ ├──────────────────────────────────────────────────────────────────┤
                                      │ │id INT GENERATED ALWAYS AS IDENTITY                               │
                                      │ │reason TEXT                                                       │
                                      │ │acronym_id UUID                                                   │
                                      │ │PRIMARY KEY (id)                                                  │
                                      ├─┤FOREIGN KEY (acronym_id) REFERENCES acronym (id) ON DELETE CASCADE│
                                      │ │                                                                  │
                                      │ │                                                                  │
                                      │ └──────────────────────────────────────────────────────────────────┘
                                      │ ┌──────────────────────────────────────────────────────────────────┐
                                      │ │                             request                              │
                                      │ ├──────────────────────────────────────────────────────────────────┤
                                      │ │id INT GENERATED ALWAYS AS IDENTITY                               │
                                      │ │approved BOOLEAN                                                  │
                                      │ │acronym_id UUID                                                   │
                                      │ │PRIMARY KEY (id)                                                  │
                                      └─┤FOREIGN KEY (acronym_id) REFERENCES acronym (id) ON DELETE CASCADE│
                                        │                                                                  │
                                        │                                                                  │
                                        └──────────────────────────────────────────────────────────────────┘

SELECT acronym.*, report.reason           CREATE VIEW acronym_tags_view AS
--FROM acronym                            --SELECT acronym_id, tag.*
----JOIN report                           ----FROM acronym_tag LEFT JOIN tag
------ON report.acronym_id = acronym.id   ------ON acronym_tag.tag_id = tag.id

                                          CREATE VIEW tag_acronyms_view AS
                                          --SELECT tag_id, acronym.*
                                          ----FROM acronym_tag LEFT JOIN acronym
                                          ------ON acronym_tag.acronym_id = acronym.id
```
