
import React, { useState } from 'react';

const ModelArchitecture = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (path) => {
    setExpandedSections(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const getColorForDepth = (depth) => {
    const colors = [
      'bg-blue-50',
      'bg-green-50',
      'bg-purple-50',
      'bg-orange-50',
      'bg-pink-50'
    ];
    return colors[depth % colors.length];
  };

  const ArchitectureNode = ({ name, children, path, depth = 0, details }) => {
    const isExpanded = expandedSections[path];
    return (
      <div className={`p-3 rounded-lg ${getColorForDepth(depth)} mb-2`}>
        <div 
          className="font-semibold flex items-center gap-2 cursor-pointer"
          onClick={() => toggleSection(path)}
        >
          <span className="text-gray-600 select-none">
            {children ? (isExpanded ? '▼' : '►') : '•'}
          </span>
          <span>{name}</span>
        </div>
        {details && (
          <div className="ml-6 text-sm text-gray-600">{details}</div>
        )}
        {children && isExpanded && (
          <div className="ml-6 mt-2 border-l-2 border-gray-300 pl-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  // Architecture data
  const architectureData = {
  "id": 1,
  "name": "Moondream",
  "path": "1",
  "children": [
    {
      "id": 2,
      "name": "VisionEncoder",
      "path": "1/2",
      "children": [
        {
          "id": 3,
          "name": "EncoderWrapper",
          "path": "1/2/3",
          "children": [
            {
              "id": 4,
              "name": "ModuleDict",
              "path": "1/2/3/4",
              "children": [
                {
                  "id": 5,
                  "name": "VisionTransformer",
                  "path": "1/2/3/4/5",
                  "children": [
                    {
                      "id": 6,
                      "name": "LinearPatchEmbedding",
                      "path": "1/2/3/4/5/6",
                      "children": [
                        {
                          "id": 7,
                          "name": "Linear",
                          "path": "1/2/3/4/5/6/7",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 588,
                              "out_features": 1152
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "LinearPatchEmbedding",
                        "params": {
                          "in_features": 588,
                          "out_features": 1152
                        }
                      }
                    },
                    {
                      "id": 8,
                      "name": "Sequential",
                      "path": "1/2/3/4/5/8",
                      "children": [
                        {
                          "id": 9,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/9",
                          "children": [
                            {
                              "id": 10,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/9/10",
                              "children": [
                                {
                                  "id": 11,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/9/10/11",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 12,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/9/10/12",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 13,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/9/13",
                              "children": [
                                {
                                  "id": 14,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/9/13/14",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 15,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/9/13/15",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 16,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/9/13/16",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 17,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/9/17",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 18,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/9/18",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 19,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/19",
                          "children": [
                            {
                              "id": 20,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/19/20",
                              "children": [
                                {
                                  "id": 21,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/19/20/21",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 22,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/19/20/22",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 23,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/19/23",
                              "children": [
                                {
                                  "id": 24,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/19/23/24",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 25,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/19/23/25",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 26,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/19/23/26",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 27,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/19/27",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 28,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/19/28",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 29,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/29",
                          "children": [
                            {
                              "id": 30,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/29/30",
                              "children": [
                                {
                                  "id": 31,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/29/30/31",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 32,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/29/30/32",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 33,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/29/33",
                              "children": [
                                {
                                  "id": 34,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/29/33/34",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 35,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/29/33/35",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 36,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/29/33/36",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 37,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/29/37",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 38,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/29/38",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 39,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/39",
                          "children": [
                            {
                              "id": 40,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/39/40",
                              "children": [
                                {
                                  "id": 41,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/39/40/41",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 42,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/39/40/42",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 43,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/39/43",
                              "children": [
                                {
                                  "id": 44,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/39/43/44",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 45,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/39/43/45",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 46,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/39/43/46",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 47,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/39/47",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 48,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/39/48",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 49,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/49",
                          "children": [
                            {
                              "id": 50,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/49/50",
                              "children": [
                                {
                                  "id": 51,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/49/50/51",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 52,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/49/50/52",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 53,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/49/53",
                              "children": [
                                {
                                  "id": 54,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/49/53/54",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 55,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/49/53/55",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 56,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/49/53/56",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 57,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/49/57",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 58,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/49/58",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 59,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/59",
                          "children": [
                            {
                              "id": 60,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/59/60",
                              "children": [
                                {
                                  "id": 61,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/59/60/61",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 62,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/59/60/62",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 63,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/59/63",
                              "children": [
                                {
                                  "id": 64,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/59/63/64",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 65,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/59/63/65",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 66,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/59/63/66",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 67,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/59/67",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 68,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/59/68",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 69,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/69",
                          "children": [
                            {
                              "id": 70,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/69/70",
                              "children": [
                                {
                                  "id": 71,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/69/70/71",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 72,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/69/70/72",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 73,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/69/73",
                              "children": [
                                {
                                  "id": 74,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/69/73/74",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 75,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/69/73/75",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 76,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/69/73/76",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 77,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/69/77",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 78,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/69/78",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 79,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/79",
                          "children": [
                            {
                              "id": 80,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/79/80",
                              "children": [
                                {
                                  "id": 81,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/79/80/81",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 82,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/79/80/82",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 83,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/79/83",
                              "children": [
                                {
                                  "id": 84,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/79/83/84",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 85,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/79/83/85",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 86,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/79/83/86",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 87,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/79/87",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 88,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/79/88",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 89,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/89",
                          "children": [
                            {
                              "id": 90,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/89/90",
                              "children": [
                                {
                                  "id": 91,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/89/90/91",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 92,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/89/90/92",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 93,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/89/93",
                              "children": [
                                {
                                  "id": 94,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/89/93/94",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 95,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/89/93/95",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 96,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/89/93/96",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 97,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/89/97",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 98,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/89/98",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 99,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/99",
                          "children": [
                            {
                              "id": 100,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/99/100",
                              "children": [
                                {
                                  "id": 101,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/99/100/101",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 102,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/99/100/102",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 103,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/99/103",
                              "children": [
                                {
                                  "id": 104,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/99/103/104",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 105,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/99/103/105",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 106,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/99/103/106",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 107,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/99/107",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 108,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/99/108",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 109,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/109",
                          "children": [
                            {
                              "id": 110,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/109/110",
                              "children": [
                                {
                                  "id": 111,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/109/110/111",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 112,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/109/110/112",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 113,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/109/113",
                              "children": [
                                {
                                  "id": 114,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/109/113/114",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 115,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/109/113/115",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 116,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/109/113/116",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 117,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/109/117",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 118,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/109/118",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 119,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/119",
                          "children": [
                            {
                              "id": 120,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/119/120",
                              "children": [
                                {
                                  "id": 121,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/119/120/121",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 122,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/119/120/122",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 123,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/119/123",
                              "children": [
                                {
                                  "id": 124,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/119/123/124",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 125,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/119/123/125",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 126,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/119/123/126",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 127,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/119/127",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 128,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/119/128",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 129,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/129",
                          "children": [
                            {
                              "id": 130,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/129/130",
                              "children": [
                                {
                                  "id": 131,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/129/130/131",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 132,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/129/130/132",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 133,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/129/133",
                              "children": [
                                {
                                  "id": 134,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/129/133/134",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 135,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/129/133/135",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 136,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/129/133/136",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 137,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/129/137",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 138,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/129/138",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 139,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/139",
                          "children": [
                            {
                              "id": 140,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/139/140",
                              "children": [
                                {
                                  "id": 141,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/139/140/141",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 142,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/139/140/142",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 143,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/139/143",
                              "children": [
                                {
                                  "id": 144,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/139/143/144",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 145,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/139/143/145",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 146,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/139/143/146",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 147,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/139/147",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 148,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/139/148",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 149,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/149",
                          "children": [
                            {
                              "id": 150,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/149/150",
                              "children": [
                                {
                                  "id": 151,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/149/150/151",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 152,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/149/150/152",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 153,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/149/153",
                              "children": [
                                {
                                  "id": 154,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/149/153/154",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 155,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/149/153/155",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 156,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/149/153/156",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 157,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/149/157",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 158,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/149/158",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 159,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/159",
                          "children": [
                            {
                              "id": 160,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/159/160",
                              "children": [
                                {
                                  "id": 161,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/159/160/161",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 162,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/159/160/162",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 163,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/159/163",
                              "children": [
                                {
                                  "id": 164,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/159/163/164",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 165,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/159/163/165",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 166,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/159/163/166",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 167,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/159/167",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 168,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/159/168",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 169,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/169",
                          "children": [
                            {
                              "id": 170,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/169/170",
                              "children": [
                                {
                                  "id": 171,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/169/170/171",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 172,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/169/170/172",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 173,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/169/173",
                              "children": [
                                {
                                  "id": 174,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/169/173/174",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 175,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/169/173/175",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 176,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/169/173/176",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 177,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/169/177",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 178,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/169/178",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 179,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/179",
                          "children": [
                            {
                              "id": 180,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/179/180",
                              "children": [
                                {
                                  "id": 181,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/179/180/181",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 182,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/179/180/182",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 183,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/179/183",
                              "children": [
                                {
                                  "id": 184,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/179/183/184",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 185,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/179/183/185",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 186,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/179/183/186",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 187,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/179/187",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 188,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/179/188",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 189,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/189",
                          "children": [
                            {
                              "id": 190,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/189/190",
                              "children": [
                                {
                                  "id": 191,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/189/190/191",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 192,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/189/190/192",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 193,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/189/193",
                              "children": [
                                {
                                  "id": 194,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/189/193/194",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 195,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/189/193/195",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 196,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/189/193/196",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 197,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/189/197",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 198,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/189/198",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 199,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/199",
                          "children": [
                            {
                              "id": 200,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/199/200",
                              "children": [
                                {
                                  "id": 201,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/199/200/201",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 202,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/199/200/202",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 203,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/199/203",
                              "children": [
                                {
                                  "id": 204,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/199/203/204",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 205,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/199/203/205",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 206,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/199/203/206",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 207,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/199/207",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 208,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/199/208",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 209,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/209",
                          "children": [
                            {
                              "id": 210,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/209/210",
                              "children": [
                                {
                                  "id": 211,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/209/210/211",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 212,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/209/210/212",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 213,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/209/213",
                              "children": [
                                {
                                  "id": 214,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/209/213/214",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 215,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/209/213/215",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 216,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/209/213/216",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 217,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/209/217",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 218,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/209/218",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 219,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/219",
                          "children": [
                            {
                              "id": 220,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/219/220",
                              "children": [
                                {
                                  "id": 221,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/219/220/221",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 222,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/219/220/222",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 223,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/219/223",
                              "children": [
                                {
                                  "id": 224,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/219/223/224",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 225,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/219/223/225",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 226,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/219/223/226",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 227,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/219/227",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 228,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/219/228",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 229,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/229",
                          "children": [
                            {
                              "id": 230,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/229/230",
                              "children": [
                                {
                                  "id": 231,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/229/230/231",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 232,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/229/230/232",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 233,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/229/233",
                              "children": [
                                {
                                  "id": 234,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/229/233/234",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 235,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/229/233/235",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 236,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/229/233/236",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 237,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/229/237",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 238,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/229/238",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 239,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/239",
                          "children": [
                            {
                              "id": 240,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/239/240",
                              "children": [
                                {
                                  "id": 241,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/239/240/241",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 242,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/239/240/242",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 243,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/239/243",
                              "children": [
                                {
                                  "id": 244,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/239/243/244",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 245,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/239/243/245",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 246,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/239/243/246",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 247,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/239/247",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 248,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/239/248",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 249,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/249",
                          "children": [
                            {
                              "id": 250,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/249/250",
                              "children": [
                                {
                                  "id": 251,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/249/250/251",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 252,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/249/250/252",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 253,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/249/253",
                              "children": [
                                {
                                  "id": 254,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/249/253/254",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 255,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/249/253/255",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 256,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/249/253/256",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 257,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/249/257",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 258,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/249/258",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 259,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/259",
                          "children": [
                            {
                              "id": 260,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/259/260",
                              "children": [
                                {
                                  "id": 261,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/259/260/261",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 262,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/259/260/262",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 263,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/259/263",
                              "children": [
                                {
                                  "id": 264,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/259/263/264",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 265,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/259/263/265",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 266,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/259/263/266",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 267,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/259/267",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 268,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/259/268",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        },
                        {
                          "id": 269,
                          "name": "VitBlock",
                          "path": "1/2/3/4/5/8/269",
                          "children": [
                            {
                              "id": 270,
                              "name": "Attention",
                              "path": "1/2/3/4/5/8/269/270",
                              "children": [
                                {
                                  "id": 271,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/269/270/271",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 3456
                                    }
                                  }
                                },
                                {
                                  "id": 272,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/269/270/272",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "Attention",
                                "params": {
                                  "in_features": 1152,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 273,
                              "name": "MLP",
                              "path": "1/2/3/4/5/8/269/273",
                              "children": [
                                {
                                  "id": 274,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/269/273/274",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 1152,
                                      "out_features": 4304
                                    }
                                  }
                                },
                                {
                                  "id": 275,
                                  "name": "GELU",
                                  "path": "1/2/3/4/5/8/269/273/275",
                                  "children": [],
                                  "info": {
                                    "type": "Activation (GELU)",
                                    "params": {}
                                  }
                                },
                                {
                                  "id": 276,
                                  "name": "Linear",
                                  "path": "1/2/3/4/5/8/269/273/276",
                                  "children": [],
                                  "info": {
                                    "type": "Linear",
                                    "params": {
                                      "in_features": 4304,
                                      "out_features": 1152
                                    }
                                  }
                                }
                              ],
                              "info": {
                                "type": "MLP",
                                "params": {
                                  "in_features": 4304,
                                  "out_features": 1152
                                }
                              }
                            },
                            {
                              "id": 277,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/269/277",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            },
                            {
                              "id": 278,
                              "name": "LayerNorm",
                              "path": "1/2/3/4/5/8/269/278",
                              "children": [],
                              "info": {
                                "type": "LayerNorm",
                                "params": {}
                              }
                            }
                          ],
                          "info": {
                            "type": "VitBlock",
                            "params": {
                              "in_features": 4304,
                              "out_features": 1152
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "Sequential",
                        "params": {
                          "in_features": 4304,
                          "out_features": 1152
                        }
                      }
                    },
                    {
                      "id": 279,
                      "name": "LayerNorm",
                      "path": "1/2/3/4/5/279",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "VisionTransformer",
                    "params": {
                      "in_features": 4304,
                      "out_features": 1152
                    }
                  }
                }
              ],
              "info": {
                "type": "ModuleDict",
                "params": {
                  "in_features": 4304,
                  "out_features": 1152
                }
              }
            }
          ],
          "info": {
            "type": "EncoderWrapper",
            "params": {
              "in_features": 4304,
              "out_features": 1152
            }
          }
        },
        {
          "id": 280,
          "name": "VisionProjection",
          "path": "1/2/280",
          "children": [
            {
              "id": 281,
              "name": "MLP",
              "path": "1/2/280/281",
              "children": [
                {
                  "id": 282,
                  "name": "Linear",
                  "path": "1/2/280/281/282",
                  "children": [],
                  "info": {
                    "type": "Linear",
                    "params": {
                      "in_features": 2304,
                      "out_features": 8192
                    }
                  }
                },
                {
                  "id": 283,
                  "name": "GELU",
                  "path": "1/2/280/281/283",
                  "children": [],
                  "info": {
                    "type": "Activation (GELU)",
                    "params": {}
                  }
                },
                {
                  "id": 284,
                  "name": "Linear",
                  "path": "1/2/280/281/284",
                  "children": [],
                  "info": {
                    "type": "Linear",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                }
              ],
              "info": {
                "type": "MLP",
                "params": {
                  "in_features": 8192,
                  "out_features": 2048
                }
              }
            }
          ],
          "info": {
            "type": "VisionProjection",
            "params": {
              "in_features": 8192,
              "out_features": 2048
            }
          }
        }
      ],
      "info": {
        "type": "VisionEncoder",
        "params": {
          "in_features": 8192,
          "out_features": 2048
        }
      }
    },
    {
      "id": 285,
      "name": "RegionModel",
      "path": "1/285",
      "children": [
        {
          "id": 286,
          "name": "FourierFeatures",
          "path": "1/285/286",
          "children": [],
          "info": {
            "type": "FourierFeatures",
            "params": {}
          }
        },
        {
          "id": 287,
          "name": "Linear",
          "path": "1/285/287",
          "children": [],
          "info": {
            "type": "Linear",
            "params": {
              "in_features": 256,
              "out_features": 2048
            }
          }
        },
        {
          "id": 288,
          "name": "FourierFeatures",
          "path": "1/285/288",
          "children": [],
          "info": {
            "type": "FourierFeatures",
            "params": {}
          }
        },
        {
          "id": 289,
          "name": "Linear",
          "path": "1/285/289",
          "children": [],
          "info": {
            "type": "Linear",
            "params": {
              "in_features": 256,
              "out_features": 2048
            }
          }
        },
        {
          "id": 290,
          "name": "Linear",
          "path": "1/285/290",
          "children": [],
          "info": {
            "type": "Linear",
            "params": {
              "in_features": 2048,
              "out_features": 2
            }
          }
        },
        {
          "id": 291,
          "name": "Linear",
          "path": "1/285/291",
          "children": [],
          "info": {
            "type": "Linear",
            "params": {
              "in_features": 2048,
              "out_features": 2
            }
          }
        },
        {
          "id": 292,
          "name": "Linear",
          "path": "1/285/292",
          "children": [],
          "info": {
            "type": "Linear",
            "params": {
              "in_features": 2048,
              "out_features": 1
            }
          }
        }
      ],
      "info": {
        "type": "RegionModel",
        "params": {
          "in_features": 2048,
          "out_features": 1
        }
      }
    },
    {
      "id": 293,
      "name": "PhiForCausalLM",
      "path": "1/293",
      "children": [
        {
          "id": 294,
          "name": "PhiModel",
          "path": "1/293/294",
          "children": [
            {
              "id": 295,
              "name": "Embedding",
              "path": "1/293/294/295",
              "children": [
                {
                  "id": 296,
                  "name": "Embedding",
                  "path": "1/293/294/295/296",
                  "children": [],
                  "info": {
                    "type": "Embedding",
                    "params": {
                      "in_features": 2048,
                      "out_features": 51200
                    }
                  }
                }
              ],
              "info": {
                "type": "Embedding",
                "params": {
                  "in_features": 2048,
                  "out_features": 51200
                }
              }
            },
            {
              "id": 297,
              "name": "Dropout",
              "path": "1/293/294/297",
              "children": [],
              "info": {
                "type": "Dropout",
                "params": {}
              }
            },
            {
              "id": 298,
              "name": "ModuleList",
              "path": "1/293/294/298",
              "children": [
                {
                  "id": 299,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/299",
                  "children": [
                    {
                      "id": 300,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/299/300",
                      "children": [
                        {
                          "id": 301,
                          "name": "Linear",
                          "path": "1/293/294/298/299/300/301",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 302,
                          "name": "Linear",
                          "path": "1/293/294/298/299/300/302",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 303,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/299/300/303",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 304,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/299/304",
                      "children": [
                        {
                          "id": 305,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/299/304/305",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 306,
                          "name": "Linear",
                          "path": "1/293/294/298/299/304/306",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 307,
                          "name": "Linear",
                          "path": "1/293/294/298/299/304/307",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 308,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/299/308",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 309,
                      "name": "Dropout",
                      "path": "1/293/294/298/299/309",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 310,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/310",
                  "children": [
                    {
                      "id": 311,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/310/311",
                      "children": [
                        {
                          "id": 312,
                          "name": "Linear",
                          "path": "1/293/294/298/310/311/312",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 313,
                          "name": "Linear",
                          "path": "1/293/294/298/310/311/313",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 314,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/310/311/314",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 315,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/310/315",
                      "children": [
                        {
                          "id": 316,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/310/315/316",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 317,
                          "name": "Linear",
                          "path": "1/293/294/298/310/315/317",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 318,
                          "name": "Linear",
                          "path": "1/293/294/298/310/315/318",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 319,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/310/319",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 320,
                      "name": "Dropout",
                      "path": "1/293/294/298/310/320",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 321,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/321",
                  "children": [
                    {
                      "id": 322,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/321/322",
                      "children": [
                        {
                          "id": 323,
                          "name": "Linear",
                          "path": "1/293/294/298/321/322/323",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 324,
                          "name": "Linear",
                          "path": "1/293/294/298/321/322/324",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 325,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/321/322/325",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 326,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/321/326",
                      "children": [
                        {
                          "id": 327,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/321/326/327",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 328,
                          "name": "Linear",
                          "path": "1/293/294/298/321/326/328",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 329,
                          "name": "Linear",
                          "path": "1/293/294/298/321/326/329",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 330,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/321/330",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 331,
                      "name": "Dropout",
                      "path": "1/293/294/298/321/331",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 332,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/332",
                  "children": [
                    {
                      "id": 333,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/332/333",
                      "children": [
                        {
                          "id": 334,
                          "name": "Linear",
                          "path": "1/293/294/298/332/333/334",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 335,
                          "name": "Linear",
                          "path": "1/293/294/298/332/333/335",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 336,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/332/333/336",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 337,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/332/337",
                      "children": [
                        {
                          "id": 338,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/332/337/338",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 339,
                          "name": "Linear",
                          "path": "1/293/294/298/332/337/339",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 340,
                          "name": "Linear",
                          "path": "1/293/294/298/332/337/340",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 341,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/332/341",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 342,
                      "name": "Dropout",
                      "path": "1/293/294/298/332/342",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 343,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/343",
                  "children": [
                    {
                      "id": 344,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/343/344",
                      "children": [
                        {
                          "id": 345,
                          "name": "Linear",
                          "path": "1/293/294/298/343/344/345",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 346,
                          "name": "Linear",
                          "path": "1/293/294/298/343/344/346",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 347,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/343/344/347",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 348,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/343/348",
                      "children": [
                        {
                          "id": 349,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/343/348/349",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 350,
                          "name": "Linear",
                          "path": "1/293/294/298/343/348/350",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 351,
                          "name": "Linear",
                          "path": "1/293/294/298/343/348/351",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 352,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/343/352",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 353,
                      "name": "Dropout",
                      "path": "1/293/294/298/343/353",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 354,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/354",
                  "children": [
                    {
                      "id": 355,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/354/355",
                      "children": [
                        {
                          "id": 356,
                          "name": "Linear",
                          "path": "1/293/294/298/354/355/356",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 357,
                          "name": "Linear",
                          "path": "1/293/294/298/354/355/357",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 358,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/354/355/358",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 359,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/354/359",
                      "children": [
                        {
                          "id": 360,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/354/359/360",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 361,
                          "name": "Linear",
                          "path": "1/293/294/298/354/359/361",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 362,
                          "name": "Linear",
                          "path": "1/293/294/298/354/359/362",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 363,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/354/363",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 364,
                      "name": "Dropout",
                      "path": "1/293/294/298/354/364",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 365,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/365",
                  "children": [
                    {
                      "id": 366,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/365/366",
                      "children": [
                        {
                          "id": 367,
                          "name": "Linear",
                          "path": "1/293/294/298/365/366/367",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 368,
                          "name": "Linear",
                          "path": "1/293/294/298/365/366/368",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 369,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/365/366/369",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 370,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/365/370",
                      "children": [
                        {
                          "id": 371,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/365/370/371",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 372,
                          "name": "Linear",
                          "path": "1/293/294/298/365/370/372",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 373,
                          "name": "Linear",
                          "path": "1/293/294/298/365/370/373",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 374,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/365/374",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 375,
                      "name": "Dropout",
                      "path": "1/293/294/298/365/375",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 376,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/376",
                  "children": [
                    {
                      "id": 377,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/376/377",
                      "children": [
                        {
                          "id": 378,
                          "name": "Linear",
                          "path": "1/293/294/298/376/377/378",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 379,
                          "name": "Linear",
                          "path": "1/293/294/298/376/377/379",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 380,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/376/377/380",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 381,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/376/381",
                      "children": [
                        {
                          "id": 382,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/376/381/382",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 383,
                          "name": "Linear",
                          "path": "1/293/294/298/376/381/383",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 384,
                          "name": "Linear",
                          "path": "1/293/294/298/376/381/384",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 385,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/376/385",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 386,
                      "name": "Dropout",
                      "path": "1/293/294/298/376/386",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 387,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/387",
                  "children": [
                    {
                      "id": 388,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/387/388",
                      "children": [
                        {
                          "id": 389,
                          "name": "Linear",
                          "path": "1/293/294/298/387/388/389",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 390,
                          "name": "Linear",
                          "path": "1/293/294/298/387/388/390",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 391,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/387/388/391",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 392,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/387/392",
                      "children": [
                        {
                          "id": 393,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/387/392/393",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 394,
                          "name": "Linear",
                          "path": "1/293/294/298/387/392/394",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 395,
                          "name": "Linear",
                          "path": "1/293/294/298/387/392/395",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 396,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/387/396",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 397,
                      "name": "Dropout",
                      "path": "1/293/294/298/387/397",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 398,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/398",
                  "children": [
                    {
                      "id": 399,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/398/399",
                      "children": [
                        {
                          "id": 400,
                          "name": "Linear",
                          "path": "1/293/294/298/398/399/400",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 401,
                          "name": "Linear",
                          "path": "1/293/294/298/398/399/401",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 402,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/398/399/402",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 403,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/398/403",
                      "children": [
                        {
                          "id": 404,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/398/403/404",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 405,
                          "name": "Linear",
                          "path": "1/293/294/298/398/403/405",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 406,
                          "name": "Linear",
                          "path": "1/293/294/298/398/403/406",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 407,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/398/407",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 408,
                      "name": "Dropout",
                      "path": "1/293/294/298/398/408",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 409,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/409",
                  "children": [
                    {
                      "id": 410,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/409/410",
                      "children": [
                        {
                          "id": 411,
                          "name": "Linear",
                          "path": "1/293/294/298/409/410/411",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 412,
                          "name": "Linear",
                          "path": "1/293/294/298/409/410/412",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 413,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/409/410/413",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 414,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/409/414",
                      "children": [
                        {
                          "id": 415,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/409/414/415",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 416,
                          "name": "Linear",
                          "path": "1/293/294/298/409/414/416",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 417,
                          "name": "Linear",
                          "path": "1/293/294/298/409/414/417",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 418,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/409/418",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 419,
                      "name": "Dropout",
                      "path": "1/293/294/298/409/419",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 420,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/420",
                  "children": [
                    {
                      "id": 421,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/420/421",
                      "children": [
                        {
                          "id": 422,
                          "name": "Linear",
                          "path": "1/293/294/298/420/421/422",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 423,
                          "name": "Linear",
                          "path": "1/293/294/298/420/421/423",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 424,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/420/421/424",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 425,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/420/425",
                      "children": [
                        {
                          "id": 426,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/420/425/426",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 427,
                          "name": "Linear",
                          "path": "1/293/294/298/420/425/427",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 428,
                          "name": "Linear",
                          "path": "1/293/294/298/420/425/428",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 429,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/420/429",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 430,
                      "name": "Dropout",
                      "path": "1/293/294/298/420/430",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 431,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/431",
                  "children": [
                    {
                      "id": 432,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/431/432",
                      "children": [
                        {
                          "id": 433,
                          "name": "Linear",
                          "path": "1/293/294/298/431/432/433",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 434,
                          "name": "Linear",
                          "path": "1/293/294/298/431/432/434",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 435,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/431/432/435",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 436,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/431/436",
                      "children": [
                        {
                          "id": 437,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/431/436/437",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 438,
                          "name": "Linear",
                          "path": "1/293/294/298/431/436/438",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 439,
                          "name": "Linear",
                          "path": "1/293/294/298/431/436/439",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 440,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/431/440",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 441,
                      "name": "Dropout",
                      "path": "1/293/294/298/431/441",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 442,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/442",
                  "children": [
                    {
                      "id": 443,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/442/443",
                      "children": [
                        {
                          "id": 444,
                          "name": "Linear",
                          "path": "1/293/294/298/442/443/444",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 445,
                          "name": "Linear",
                          "path": "1/293/294/298/442/443/445",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 446,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/442/443/446",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 447,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/442/447",
                      "children": [
                        {
                          "id": 448,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/442/447/448",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 449,
                          "name": "Linear",
                          "path": "1/293/294/298/442/447/449",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 450,
                          "name": "Linear",
                          "path": "1/293/294/298/442/447/450",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 451,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/442/451",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 452,
                      "name": "Dropout",
                      "path": "1/293/294/298/442/452",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 453,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/453",
                  "children": [
                    {
                      "id": 454,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/453/454",
                      "children": [
                        {
                          "id": 455,
                          "name": "Linear",
                          "path": "1/293/294/298/453/454/455",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 456,
                          "name": "Linear",
                          "path": "1/293/294/298/453/454/456",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 457,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/453/454/457",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 458,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/453/458",
                      "children": [
                        {
                          "id": 459,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/453/458/459",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 460,
                          "name": "Linear",
                          "path": "1/293/294/298/453/458/460",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 461,
                          "name": "Linear",
                          "path": "1/293/294/298/453/458/461",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 462,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/453/462",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 463,
                      "name": "Dropout",
                      "path": "1/293/294/298/453/463",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 464,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/464",
                  "children": [
                    {
                      "id": 465,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/464/465",
                      "children": [
                        {
                          "id": 466,
                          "name": "Linear",
                          "path": "1/293/294/298/464/465/466",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 467,
                          "name": "Linear",
                          "path": "1/293/294/298/464/465/467",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 468,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/464/465/468",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 469,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/464/469",
                      "children": [
                        {
                          "id": 470,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/464/469/470",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 471,
                          "name": "Linear",
                          "path": "1/293/294/298/464/469/471",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 472,
                          "name": "Linear",
                          "path": "1/293/294/298/464/469/472",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 473,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/464/473",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 474,
                      "name": "Dropout",
                      "path": "1/293/294/298/464/474",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 475,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/475",
                  "children": [
                    {
                      "id": 476,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/475/476",
                      "children": [
                        {
                          "id": 477,
                          "name": "Linear",
                          "path": "1/293/294/298/475/476/477",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 478,
                          "name": "Linear",
                          "path": "1/293/294/298/475/476/478",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 479,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/475/476/479",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 480,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/475/480",
                      "children": [
                        {
                          "id": 481,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/475/480/481",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 482,
                          "name": "Linear",
                          "path": "1/293/294/298/475/480/482",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 483,
                          "name": "Linear",
                          "path": "1/293/294/298/475/480/483",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 484,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/475/484",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 485,
                      "name": "Dropout",
                      "path": "1/293/294/298/475/485",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 486,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/486",
                  "children": [
                    {
                      "id": 487,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/486/487",
                      "children": [
                        {
                          "id": 488,
                          "name": "Linear",
                          "path": "1/293/294/298/486/487/488",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 489,
                          "name": "Linear",
                          "path": "1/293/294/298/486/487/489",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 490,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/486/487/490",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 491,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/486/491",
                      "children": [
                        {
                          "id": 492,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/486/491/492",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 493,
                          "name": "Linear",
                          "path": "1/293/294/298/486/491/493",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 494,
                          "name": "Linear",
                          "path": "1/293/294/298/486/491/494",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 495,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/486/495",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 496,
                      "name": "Dropout",
                      "path": "1/293/294/298/486/496",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 497,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/497",
                  "children": [
                    {
                      "id": 498,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/497/498",
                      "children": [
                        {
                          "id": 499,
                          "name": "Linear",
                          "path": "1/293/294/298/497/498/499",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 500,
                          "name": "Linear",
                          "path": "1/293/294/298/497/498/500",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 501,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/497/498/501",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 502,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/497/502",
                      "children": [
                        {
                          "id": 503,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/497/502/503",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 504,
                          "name": "Linear",
                          "path": "1/293/294/298/497/502/504",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 505,
                          "name": "Linear",
                          "path": "1/293/294/298/497/502/505",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 506,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/497/506",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 507,
                      "name": "Dropout",
                      "path": "1/293/294/298/497/507",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 508,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/508",
                  "children": [
                    {
                      "id": 509,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/508/509",
                      "children": [
                        {
                          "id": 510,
                          "name": "Linear",
                          "path": "1/293/294/298/508/509/510",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 511,
                          "name": "Linear",
                          "path": "1/293/294/298/508/509/511",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 512,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/508/509/512",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 513,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/508/513",
                      "children": [
                        {
                          "id": 514,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/508/513/514",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 515,
                          "name": "Linear",
                          "path": "1/293/294/298/508/513/515",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 516,
                          "name": "Linear",
                          "path": "1/293/294/298/508/513/516",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 517,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/508/517",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 518,
                      "name": "Dropout",
                      "path": "1/293/294/298/508/518",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 519,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/519",
                  "children": [
                    {
                      "id": 520,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/519/520",
                      "children": [
                        {
                          "id": 521,
                          "name": "Linear",
                          "path": "1/293/294/298/519/520/521",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 522,
                          "name": "Linear",
                          "path": "1/293/294/298/519/520/522",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 523,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/519/520/523",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 524,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/519/524",
                      "children": [
                        {
                          "id": 525,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/519/524/525",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 526,
                          "name": "Linear",
                          "path": "1/293/294/298/519/524/526",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 527,
                          "name": "Linear",
                          "path": "1/293/294/298/519/524/527",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 528,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/519/528",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 529,
                      "name": "Dropout",
                      "path": "1/293/294/298/519/529",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 530,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/530",
                  "children": [
                    {
                      "id": 531,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/530/531",
                      "children": [
                        {
                          "id": 532,
                          "name": "Linear",
                          "path": "1/293/294/298/530/531/532",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 533,
                          "name": "Linear",
                          "path": "1/293/294/298/530/531/533",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 534,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/530/531/534",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 535,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/530/535",
                      "children": [
                        {
                          "id": 536,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/530/535/536",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 537,
                          "name": "Linear",
                          "path": "1/293/294/298/530/535/537",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 538,
                          "name": "Linear",
                          "path": "1/293/294/298/530/535/538",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 539,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/530/539",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 540,
                      "name": "Dropout",
                      "path": "1/293/294/298/530/540",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 541,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/541",
                  "children": [
                    {
                      "id": 542,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/541/542",
                      "children": [
                        {
                          "id": 543,
                          "name": "Linear",
                          "path": "1/293/294/298/541/542/543",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 544,
                          "name": "Linear",
                          "path": "1/293/294/298/541/542/544",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 545,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/541/542/545",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 546,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/541/546",
                      "children": [
                        {
                          "id": 547,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/541/546/547",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 548,
                          "name": "Linear",
                          "path": "1/293/294/298/541/546/548",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 549,
                          "name": "Linear",
                          "path": "1/293/294/298/541/546/549",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 550,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/541/550",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 551,
                      "name": "Dropout",
                      "path": "1/293/294/298/541/551",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                },
                {
                  "id": 552,
                  "name": "PhiDecoderLayer",
                  "path": "1/293/294/298/552",
                  "children": [
                    {
                      "id": 553,
                      "name": "PhiSdpaAttention",
                      "path": "1/293/294/298/552/553",
                      "children": [
                        {
                          "id": 554,
                          "name": "Linear",
                          "path": "1/293/294/298/552/553/554",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 6144
                            }
                          }
                        },
                        {
                          "id": 555,
                          "name": "Linear",
                          "path": "1/293/294/298/552/553/555",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 2048
                            }
                          }
                        },
                        {
                          "id": 556,
                          "name": "PhiRotaryEmbedding",
                          "path": "1/293/294/298/552/553/556",
                          "children": [],
                          "info": {
                            "type": "PhiRotaryEmbedding",
                            "params": {}
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiSdpaAttention",
                        "params": {
                          "in_features": 2048,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 557,
                      "name": "PhiMLP",
                      "path": "1/293/294/298/552/557",
                      "children": [
                        {
                          "id": 558,
                          "name": "NewGELUActivation",
                          "path": "1/293/294/298/552/557/558",
                          "children": [],
                          "info": {
                            "type": "NewGELUActivation",
                            "params": {}
                          }
                        },
                        {
                          "id": 559,
                          "name": "Linear",
                          "path": "1/293/294/298/552/557/559",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 2048,
                              "out_features": 8192
                            }
                          }
                        },
                        {
                          "id": 560,
                          "name": "Linear",
                          "path": "1/293/294/298/552/557/560",
                          "children": [],
                          "info": {
                            "type": "Linear",
                            "params": {
                              "in_features": 8192,
                              "out_features": 2048
                            }
                          }
                        }
                      ],
                      "info": {
                        "type": "PhiMLP",
                        "params": {
                          "in_features": 8192,
                          "out_features": 2048
                        }
                      }
                    },
                    {
                      "id": 561,
                      "name": "LayerNorm",
                      "path": "1/293/294/298/552/561",
                      "children": [],
                      "info": {
                        "type": "LayerNorm",
                        "params": {}
                      }
                    },
                    {
                      "id": 562,
                      "name": "Dropout",
                      "path": "1/293/294/298/552/562",
                      "children": [],
                      "info": {
                        "type": "Dropout",
                        "params": {}
                      }
                    }
                  ],
                  "info": {
                    "type": "PhiDecoderLayer",
                    "params": {
                      "in_features": 8192,
                      "out_features": 2048
                    }
                  }
                }
              ],
              "info": {
                "type": "ModuleList",
                "params": {
                  "in_features": 8192,
                  "out_features": 2048
                }
              }
            }
          ],
          "info": {
            "type": "PhiModel",
            "params": {
              "in_features": 8192,
              "out_features": 2048
            }
          }
        },
        {
          "id": 563,
          "name": "CausalLMHead",
          "path": "1/293/563",
          "children": [
            {
              "id": 564,
              "name": "LayerNorm",
              "path": "1/293/563/564",
              "children": [],
              "info": {
                "type": "LayerNorm",
                "params": {}
              }
            },
            {
              "id": 565,
              "name": "Linear",
              "path": "1/293/563/565",
              "children": [],
              "info": {
                "type": "Linear",
                "params": {
                  "in_features": 2048,
                  "out_features": 51200
                }
              }
            }
          ],
          "info": {
            "type": "CausalLMHead",
            "params": {
              "in_features": 2048,
              "out_features": 51200
            }
          }
        }
      ],
      "info": {
        "type": "PhiForCausalLM",
        "params": {
          "in_features": 2048,
          "out_features": 51200
        }
      }
    }
  ],
  "info": {
    "type": "Moondream",
    "params": {
      "in_features": 2048,
      "out_features": 51200
    }
  }
};

  const renderNode = (node, depth = 0) => {
    const details = node.info ? Object.entries(node.info.params)
      .map(([k, v]) => `${k}: ${v}`).join(', ') : null;
    
    return (
      <ArchitectureNode
        key={node.path}
        name={`${node.name}`}
        path={node.path}
        depth={depth}
        details={details}
      >
        {node.children && node.children.map(child => renderNode(child, depth + 1))}
      </ArchitectureNode>
    );
  };

  return (
    <div className="w-full max-w-6xl p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Model Architecture Visualization</h2>
      <div className="space-y-4 overflow-y-auto max-h-[800px]">
        {renderNode(architectureData)}
      </div>
    </div>
  );
};

export default ModelArchitecture;
