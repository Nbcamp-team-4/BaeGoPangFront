import { useEffect, useState } from 'react';

import { Phone, TopBar, Btn, Badge } from '../../shared/components';
import { G, PRIMARY, PRIMARY_LIGHT } from '../../shared/constants';
import { Icon } from '../../shared/icons';

import { apiFetch } from '../../shared/api/apiClient';
import { useNavigate } from 'react-router-dom';
// ── 주소 목록 페이지 ──────────────────────────────────────
function AddressListPage({ addrs, onSelect, onDelete, onGoAdd, onConfirm, onBack }) {
  const selected = addrs.find((a) => a.selected);
  const navigate = useNavigate();
  return (
    <Phone noNav>
      <TopBar title="배달 주소" backTo={onBack} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
        {addrs.map((a) => (
          <div
            key={a.id}
            onClick={() => onSelect(a.id)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '14px',
              border: `1.5px solid ${a.selected ? PRIMARY : G[200]}`,
              borderRadius: '13px',
              background: a.selected ? PRIMARY_LIGHT : '#fff',
              cursor: 'pointer',
              transition: 'all .15s'
            }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: `2px solid ${a.selected ? PRIMARY : G[300]}`,
                background: a.selected ? PRIMARY : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px'
              }}>
              {a.selected && <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#fff' }} />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: a.selected ? PRIMARY : G[900] }}>
                  {a.label}
                </span>
                {a.selected && (
                  <Badge bg={PRIMARY} color="#fff">
                    선택됨
                  </Badge>
                )}
              </div>
              <div style={{ fontSize: '13px', color: G[700], lineHeight: '1.6' }}>{a.road}</div>
              {a.detail && <div style={{ fontSize: '12px', color: G[400], marginTop: '2px' }}>{a.detail}</div>}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(a.id);
              }}
              style={{
                padding: '4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                marginTop: '2px'
              }}>
              {Icon.trash()}
            </button>
          </div>
        ))}

        <div
          onClick={onGoAdd}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px',
            border: `2px dashed ${G[300]}`,
            borderRadius: '13px',
            cursor: 'pointer',
            color: G[500]
          }}>
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: G[200],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
            <span style={{ fontSize: '14px', lineHeight: 1, color: G[500], marginTop: '-1px' }}>+</span>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, flex: 1 }}>새 주소 추가</span>
          {Icon.chevron()}
        </div>
      </div>

      <div style={{ padding: '12px 16px 32px', flexShrink: 0, borderTop: `1px solid ${G[100]}` }}>
        <Btn
          variant="primary"
          full
          size="lg"
          disabled={!selected}
          onClick={() => {
            if (onConfirm) {
              onConfirm(selected);
            } else {
              navigate(-1);
            }
          }}>
          이 주소로 배달받기
        </Btn>
      </div>
    </Phone>
  );
}

// ── 주소 추가 페이지 ──────────────────────────────────────
function AddAddressFormPage({ onBack, onAdd }) {
  const [form, setForm] = useState({ label: '', road: '', detail: '' });
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!form.road.trim() || loading) return;

    setLoading(true);
    try {
      await onAdd({
        label: form.label.trim() || '기타',
        road: form.road.trim(),
        detail: form.detail.trim()
      });
    } catch (e) {
      console.error('배송지 추가 실패', e);
      alert(e.message || '주소 추가에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Phone noNav>
      <TopBar title="새 주소 추가" backTo={onBack} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
        {[
          { label: '별명', key: 'label', ph: '집, 회사, 기타…', required: false },
          { label: '도로명 주소', key: 'road', ph: '서울 종로구 세종대로 172', required: true },
          { label: '상세 주소', key: 'detail', ph: '동·호수·층', required: false }
        ].map(({ label, key, ph, required }) => (
          <div key={key}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: G[600], marginBottom: '7px' }}>
              {label}
              {required && <span style={{ color: PRIMARY }}> *</span>}
            </div>
            <input
              value={form[key]}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
              placeholder={ph}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: `1.5px solid ${G[300]}`,
                borderRadius: '11px',
                fontSize: '13px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                outline: 'none',
                color: G[900],
                background: G[50]
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ padding: '12px 18px 32px', flexShrink: 0 }}>
        <Btn variant="primary" full size="lg" disabled={!form.road.trim() || loading} onClick={handleAdd}>
          {loading ? '추가 중...' : '주소 추가하기'}
        </Btn>
      </div>
    </Phone>
  );
}

// ── 진입점 ────────────────────────────────────────────────
export default function AddressPage({ onBack, onConfirm }) {
  const [page, setPage] = useState('list');
  const [addrs, setAddrs] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalizeAddress = (item, index = 0) => ({
    id: item.id,
    label: item.name ?? item.label ?? `주소 ${index + 1}`,
    road: item.address ?? item.road ?? '',
    detail: item.detailAddress ?? item.detail ?? '',
    selected: index === 0
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const res = await apiFetch('/api/address');

        if (!res.ok) {
          throw new Error('배송지 목록 조회 실패');
        }

        const json = await res.json();
        const payload = json?.data ?? json ?? {};
        const content = Array.isArray(payload?.content) ? payload.content : [];

        const normalized = content.map((item, index) => normalizeAddress(item, index));
        setAddrs(normalized);
      } catch (e) {
        console.error('배송지 목록 조회 실패', e);
        setAddrs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const select = (id) => {
    setAddrs((prev) => prev.map((x) => ({ ...x, selected: x.id === id })));
  };

  const remove = (id) => {
    setAddrs((prev) => prev.filter((x) => x.id !== id));
  };

  const handleAdd = async (newAddr) => {
    const payload = {
      name: newAddr.label,
      phone: '010-1234-1234',
      address: newAddr.road,
      detailAddress: newAddr.detail,
      latitude: 37.4979,
      longitude: 127.0276,
      isDefault: addrs.length === 0
    };

    console.log('배송지 추가 요청:', payload);

    const res = await apiFetch('/api/address', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('배송지 추가 실패 응답:', errorData);
      throw new Error(errorData?.message || '주소 추가에 실패했습니다.');
    }

    const json = await res.json();
    console.log('배송지 추가 응답:', json);

    const saved = json?.data ?? json;

    const nextAddr = {
      id: saved?.id ?? Date.now(),
      label: saved?.name ?? newAddr.label,
      road: saved?.address ?? newAddr.road,
      detail: saved?.detailAddress ?? newAddr.detail,
      selected: true
    };

    setAddrs((prev) => [...prev.map((x) => ({ ...x, selected: false })), nextAddr]);
    setPage('list');
  };

  if (page === 'add') {
    return <AddAddressFormPage onBack={() => setPage('list')} onAdd={handleAdd} />;
  }

  if (loading) {
    return (
      <Phone noNav>
        <TopBar title="배달 주소" backTo={onBack} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: G[500],
            fontSize: '13px'
          }}>
          배송지 목록을 불러오는 중입니다.
        </div>
      </Phone>
    );
  }

  return (
    <AddressListPage
      addrs={addrs}
      onSelect={select}
      onDelete={remove}
      onGoAdd={() => setPage('add')}
      onConfirm={onConfirm}
      onBack={onBack}
    />
  );
}
